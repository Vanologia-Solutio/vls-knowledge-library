'use client'

import { InvoicerTable } from '@/components/documents/invoices/invoicer-table'
import { InvoicerUploader } from '@/components/documents/invoices/invoicer-uploader'
import { Separator } from '@/components/ui/separator'
import { documentQueries } from '@/hooks/use-documents'

export default function InvoicesPage() {
  const { data } = documentQueries.useList()

  return (
    <main>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold'>Invoice Manager</h1>
          <p className='text-sm text-muted-foreground'>
            Upload, organize, and manage your invoice documents.
          </p>
        </div>
        <InvoicerUploader />
      </div>
      <Separator className='my-6' />
      <InvoicerTable data={data?.data ?? []} />
    </main>
  )
}
