import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className='flex flex-col items-center justify-center h-full p-4'>
      <h1 className='text-5xl font-bold'>
        Welcome Back,{' '}
        <span className='text-red-700'>{user?.user_metadata?.full_name}</span>!
      </h1>
      <p className='mt-2 text-lg'>
        Glad to see you back! Explore your documents and manage your account.
      </p>
      <p className='text-zinc-500'>
        Use the sidebar to navigate through the platform.
      </p>
    </div>
  )
}
