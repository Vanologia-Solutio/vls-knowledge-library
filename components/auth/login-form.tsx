import logo from '@/assets/images/vanologia-solutio.webp'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { supabaseBrowser } from '@/lib/supabase/browser'
import { cn } from '@/lib/utils'
import { Github } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Separator } from '../ui/separator'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [loading, setLoading] = useState<boolean>(false)

  const handleLoginWithGithub = async () => {
    setLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      await supabaseBrowser.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className='text-center'>
          <Image
            src={logo.src}
            alt='Logo'
            width={160}
            height={160}
            className='mx-auto'
          />
          <Separator className='my-2' />
          <CardTitle className='text-xl font-bold'>
            Login to your account
          </CardTitle>
          <CardDescription>
            Sign in with your Github account to access the knowledge library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleLoginWithGithub}
            className='w-full'
            disabled={loading}
          >
            Login with Github
            <Github className='size-4' />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
