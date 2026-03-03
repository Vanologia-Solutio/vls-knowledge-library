import { IconName } from '../utils/icons'

export const routes: {
  navMain: {
    title: string
    icon?: IconName
    isActive: boolean
    items: {
      title: string
      url: string
    }[]
  }[]
} = {
  navMain: [
    {
      title: 'Home',
      icon: 'Home',
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
      icon: 'BookSearch',
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
