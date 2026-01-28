import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileQuestionIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <Card className='mx-auto max-w-md'>
        <CardHeader className='text-center'>
          <div className='flex justify-center mb-4'>
            <div className='rounded-full bg-muted p-3'>
              <FileQuestionIcon className='size-8 text-muted-foreground' />
            </div>
          </div>
          <CardTitle className='text-2xl'>Page Not Found</CardTitle>
          <CardDescription>
            The page you are looking for doesn&apos;t exist or has been moved
          </CardDescription>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-4xl font-bold mb-2'>404</p>
          <p className='text-muted-foreground'>
            We couldn&apos;t find the page you were looking for. Please check
            the URL or navigate back to the homepage.
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
