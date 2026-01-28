import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ShieldXIcon } from 'lucide-react'
import Link from 'next/link'

export default function ForbiddenPage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='mx-auto max-w-md'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <div className='rounded-full bg-muted p-3'>
              <ShieldXIcon className='size-8 text-muted-foreground' />
            </div>
          </div>
          <CardTitle className='text-2xl'>Access Forbidden</CardTitle>
          <CardDescription>
            You are not allowed to access this resource
          </CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-4xl font-bold mb-2'>403</p>
          <p className='text-muted-foreground'>
            The server understood your request but refuses to authorize it.
            Please contact your administrator if you believe this is a mistake.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button asChild>
            <Link href='/dashboard'>Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
