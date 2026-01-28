'use client'

import { createQueryClient } from '@/lib/query-client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState<QueryClient>(() => createQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
