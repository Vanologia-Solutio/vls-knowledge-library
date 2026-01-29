import { createServerClient } from '@supabase/ssr'
import * as jose from 'jose'
import { NextResponse, type NextRequest } from 'next/server'
import { Env } from './shared/constants/environments'

async function signCookie(payload: jose.JWTPayload) {
  return new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${Env.COOKIE_MAX_AGE}s`)
    .sign(Buffer.from(Env.COOKIE_SIGNING_SECRET))
}

async function verifyCookie(token: string) {
  try {
    return await jose.jwtVerify(token, Buffer.from(Env.COOKIE_SIGNING_SECRET))
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  if (request.nextUrl.pathname === '/') return response

  const cached = request.cookies.get(Env.COOKIE_NAME)?.value
  let profile: any = null

  if (cached) {
    const verified = await verifyCookie(cached)
    if (verified) profile = verified.payload
  }

  const supabase = createServerClient(
    Env.SUPABASE_URL,
    Env.SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: cookiesToSet =>
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          }),
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.redirect(new URL('/', request.url))

  if (!profile) {
    let { data: dbProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', user.email)
      .single()

    if (!dbProfile) {
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({ email: user.email })
        .select()
        .single()

      if (!newProfile || insertError) {
        return NextResponse.redirect(
          new URL('/?reason=not_authorized', request.url),
        )
      }

      await supabase.from('footprints').insert({
        profile_id: newProfile.id,
      })

      dbProfile = newProfile
    }

    profile = dbProfile

    const token = await signCookie({
      id: profile.id,
      email: profile.email,
      is_active: profile.is_active,
    })

    response.cookies.set(Env.COOKIE_NAME, token, {
      httpOnly: true,
      path: '/',
      maxAge: Env.COOKIE_MAX_AGE,
    })
  }

  if (!profile.is_active) {
    return NextResponse.redirect(
      new URL('/?reason=not_authorized', request.url),
    )
  }

  return response
}

export const config = {
  matcher: [
    '/((?!^/$|_next/static|_next/image|favicon.ico|auth/callback|unauthorized|forbidden|not-found).*)',
  ],
}
