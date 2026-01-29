import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Env } from './shared/constants/environments'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  if (request.nextUrl.pathname === '/') {
    return response
  }

  const supabase = createServerClient(
    Env.SUPABASE_URL,
    Env.SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    },
  )

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) {
    if (error?.message.includes('expired')) {
      return NextResponse.redirect(
        new URL('/?reason=session_expired', request.url),
      )
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', user.email)
    .single()

  if (!profile || !profile.is_active) {
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
