'use client'

import { Button } from '@/components/ui/button'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { Github } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { toast } from 'sonner'
import githubIcon from '@/assets/icons/github.webp'
import googleIcon from '@/assets/icons/google.webp'
import Image from 'next/image'

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

  const [loading, setLoading] = useState<boolean>(false)

  const handleLoginWithProvider = async (provider: 'github' | 'google') => {
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const result = await supabaseBrowser.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      console.log(result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-gray-900 overflow-x-hidden'>
      <div className='relative min-h-screen flex flex-col'>
        <main className='relative flex-1 flex flex-col'>
          <div className='text-center my-auto'>
            <h1 className='flex flex-col items-center mb-14'>
              <span className='text-3xl sm:text-4xl tracking-tight font-bold mb-7 bg-linear-to-br from-slate-300 via-white to-slate-100 bg-clip-text text-transparent'>
                Vanologia Solutio Knowledge Library
              </span>
              <TypeAnimation
                sequence={[
                  'Personal Knowledge Vault.',
                  4000,
                  'Secure. Simple. Fast.',
                  4000,
                  'One Place. All Docs.',
                  4000,
                  'Think. Cloud-backed.',
                  4000,
                ]}
                wrapper='span'
                speed={60}
                repeat={Infinity}
                className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold tracking-tighter bg-linear-to-br from-slate-400 via-white to-slate-200 bg-clip-text text-transparent inline-block drop-shadow-lg after:content-['|'] after:ml-1 after:animate-blink after:text-gray-400"
                style={{ lineHeight: '1.25' }}
              />
            </h1>
            <div className='flex items-center justify-center gap-4'>
              <Button
                size='lg'
                className='text-base bg-white text-black hover:bg-slate-200'
                onClick={() => handleLoginWithProvider('github')}
                disabled={loading}
              >
                Sign in with GitHub
                <Image
                  src={githubIcon.src}
                  alt='GitHub'
                  width={24}
                  height={24}
                />
              </Button>
              <Button
                size='lg'
                className='text-base bg-white text-black hover:bg-slate-200'
                onClick={() => handleLoginWithProvider('google')}
                disabled={loading}
              >
                Sign in with Google
                <Image
                  src={googleIcon.src}
                  alt='Google'
                  width={24}
                  height={24}
                />
              </Button>
            </div>
          </div>
        </main>

        <footer className='relative bg-transparent z-10'>
          <div className='mx-auto p-4'>
            <div className='text-center text-sm text-white font-light space-y-1.5'>
              <p>
                &copy; {new Date().getFullYear()}{' '}
                <span className='font-medium'>
                  Vanologia Solutio Knowledge Library
                </span>
                . All rights reserved.
              </p>
              <p>Version 1.0.0</p>
            </div>
          </div>
        </footer>
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
