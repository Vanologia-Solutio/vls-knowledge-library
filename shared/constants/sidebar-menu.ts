import { BookSearch, Home } from 'lucide-react'

export const routes = {
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
