import { InvoiceUploader } from '@/components/documents/invoices/invoice-uploader'
import { InvoiceTable } from '@/components/documents/invoices/invoicer-table'
import { Separator } from '@/components/ui/separator'

export default function InvoicesPage() {
  return (
    <main>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-bold'>Invoice Manager</h1>
          <p className='text-sm text-muted-foreground'>
            Upload, organize, and manage your invoice documents.
          </p>
        </div>
        <InvoiceUploader />
      </div>
      <Separator className='my-6' />
      <InvoiceTable />
    </main>
  )
}
