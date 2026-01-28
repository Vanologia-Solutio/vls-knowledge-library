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

export default function UnauthorizedPage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='mx-auto max-w-md'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <div className='rounded-full bg-muted p-3'>
              <ShieldXIcon className='size-8 text-muted-foreground' />
            </div>
          </div>
          <CardTitle className='text-2xl'>Unauthorized Access</CardTitle>
          <CardDescription>
            You don&apos;t have permission to access this page
          </CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-4xl font-bold mb-2'>401</p>
          <p className='text-muted-foreground'>
            Please make sure you have the necessary permissions or contact your
            administrator for access.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button asChild>
            <Link href='/login'>Go to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
