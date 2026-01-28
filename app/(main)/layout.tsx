import { AppSidebar } from '@/components/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const userData = {
    name: user?.user_metadata?.full_name,
    email: user?.user_metadata?.email,
    avatar: user?.user_metadata?.avatar_url,
  }

  return (
    <SidebarProvider>
      <AppSidebar userData={userData} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-8 pt-0'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
