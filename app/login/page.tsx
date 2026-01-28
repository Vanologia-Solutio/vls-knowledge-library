'use client'

import { LoginForm } from '@/components/auth/login-form'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { toast } from 'sonner'

function LoginContent() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const reason = searchParams?.get('reason')
    if (reason === 'session_expired') {
      toast.error('Your session has expired. Please log in again.', {
        duration: 3000,
      })
    }

    if (reason === 'not_authorized') {
      toast.error('You are not authorized to access this system.', {
        duration: 3000,
      })
    }
  }, [searchParams])

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-zinc-100'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  )
}
