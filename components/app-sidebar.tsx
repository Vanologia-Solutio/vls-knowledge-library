'use client'

import { BookSearch, Home } from 'lucide-react'

import logo from '@/assets/images/vanologia-solutio.webp'
import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import { ComponentProps } from 'react'

const data = {
  navMain: [
    {
      title: 'Home',
      icon: Home,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '/home/dashboard',
        },
      ],
    },
    {
      title: 'Documents',
      icon: BookSearch,
      isActive: true,
      items: [
        {
          title: 'Invoices',
          url: '/documents/invoices',
        },
      ],
    },
  ],
}

export function AppSidebar({
  userData,
  ...props
}: ComponentProps<typeof Sidebar> & {
  userData: { name: string; email: string; avatar: string }
}) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='flex justify-center items-center mt-2'>
        <Image src={logo.src} alt='Logo' width={120} height={120} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
