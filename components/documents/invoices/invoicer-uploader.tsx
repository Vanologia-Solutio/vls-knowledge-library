'use client'

import { DocumentViewer } from '@/components/documents/document-viewer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { documentQueries } from '@/hooks/use-documents'
import { Loader2, UploadCloud } from 'lucide-react'
import { ChangeEvent, SubmitEvent, useState } from 'react'
import { toast } from 'sonner'

export function InvoicerUploader() {
  const [open, setOpen] = useState<boolean>(false)
  const [fileUrl, setFileUrl] = useState<string | null>(null)

  const { mutateAsync: upload, isPending } = documentQueries.useUpload()

  const handleUpload = async (e: SubmitEvent) => {
    e.preventDefault()

    const form = e.target
    const file = form.attachment.files[0]

    try {
      const payload = {
        file,
        type: 'INVOICE',
        no: (form.invoiceNo as HTMLInputElement).value,
        clientName: (form.clientName as HTMLInputElement).value,
        amount: (form.amount as HTMLInputElement).value,
        issuedDate: (form.issuedDate as HTMLInputElement).value,
        dueDate: (form.dueDate as HTMLInputElement).value,
        remark: (form.remark as HTMLTextAreaElement).value,
      }

      const res = await upload(payload)
      if (res.success) {
        toast.success('Invoice uploaded successfully')
        setOpen(false)
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to upload invoice',
      )
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setFileUrl(URL.createObjectURL(file))
    } else {
      setFileUrl(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UploadCloud className='size-4' />
          Upload Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-3xl'>
        <DialogHeader>
          <DialogTitle>Invoicer Uploader</DialogTitle>
          <DialogDescription>
            Upload your invoice documents here
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpload}>
          <FieldGroup>
            <div className='grid grid-cols-2 gap-5'>
              <Field>
                <FieldLabel>Invoice Number</FieldLabel>
                <Input
                  disabled={isPending}
                  type='text'
                  name='invoiceNo'
                  placeholder='INV-2026-001'
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Attachment</FieldLabel>
                <div className='flex items-center gap-2'>
                  <Input
                    disabled={isPending}
                    type='file'
                    name='attachment'
                    accept='.pdf'
                    required
                    onChange={handleFileChange}
                  />
                  <DocumentViewer
                    path={fileUrl ?? ''}
                    states={{
                      uploadPreview: true,
                      disableEyeButton: !fileUrl || isPending,
                    }}
                  />
                </div>
              </Field>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <Field>
                <FieldLabel>Client Name</FieldLabel>
                <Input
                  disabled={isPending}
                  type='text'
                  name='clientName'
                  placeholder='John Doe'
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Amount (IDR)</FieldLabel>
                <Input
                  disabled={isPending}
                  type='number'
                  name='amount'
                  placeholder='1000000'
                />
              </Field>
            </div>
            <div className='grid grid-cols-2 gap-6'>
              <Field>
                <FieldLabel>Issued Date</FieldLabel>
                <Input
                  disabled={isPending}
                  type='date'
                  name='issuedDate'
                  required
                />
              </Field>
              <Field>
                <FieldLabel>Due Date</FieldLabel>
                <Input disabled={isPending} type='date' name='dueDate' />
              </Field>
            </div>
            <Field>
              <FieldLabel>Remark</FieldLabel>
              <Textarea
                disabled={isPending}
                rows={2}
                name='remark'
                placeholder='Remark'
              />
            </Field>
          </FieldGroup>
          <Separator className='my-6' />
          <DialogFooter className='mt-4'>
            <DialogClose asChild>
              <Button disabled={isPending} variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type='submit'>
              {isPending ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                'Upload'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
