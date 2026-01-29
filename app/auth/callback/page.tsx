'use client'

import { supabaseBrowser } from '@/lib/supabase/browser'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabaseBrowser.auth.getSession()
      if (error || !data.session) {
        router.replace('/')
        return
      }

      const user = data.session.user

      try {
        const { data: profile } = await supabaseBrowser
          .from('profiles')
          .select('*')
          .eq('email', user.email)
          .single()

        if (profile) {
          const { data: footprint } = await supabaseBrowser
            .from('footprints')
            .select('*')
            .eq('profile_id', profile.id)
            .single()

          if (footprint) {
            await supabaseBrowser
              .from('footprints')
              .update({
                login_count: footprint.login_count + 1,
              })
              .eq('id', footprint.id)
          } else {
            await supabaseBrowser.from('footprints').insert({
              profile_id: profile.id,
            })
          }
        }
      } catch {
        console.error('Error updating login count / footprint')
      }

      router.replace('/home/dashboard')
    }

    handleAuth()
  }, [router])

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <Loader2 className='size-10 animate-spin' />
      <p>Verifying access...</p>
    </div>
  )
}
