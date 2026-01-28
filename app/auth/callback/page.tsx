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
        router.replace('/login')
        return
      }

      router.replace('/home/dashboard')
    }

    handleAuth()
  }, [router])

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <Loader2 className='size-8 animate-spin' />
      <p>Verifying access...</p>
    </div>
  )
}
