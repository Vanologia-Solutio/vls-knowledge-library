'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { documentQueries } from '@/hooks/use-document'
import { Eye, Loader2 } from 'lucide-react'

type DocumentViewerProps = {
  path: string
  fileName?: string
  states?: {
    uploadPreview?: boolean
    disableEyeButton?: boolean
  }
}

export function DocumentViewer({
  path,
  fileName,
  states,
}: DocumentViewerProps) {
  const uploadPreview = !!states?.uploadPreview
  const { data, isLoading, refetch, isFetching } = documentQueries.usePreview(
    path,
    false,
  )
  const previewUrl = uploadPreview ? path : data?.data?.url || ''
  const disabled = !!states?.disableEyeButton

  const handleDialogOpen = (open: boolean) => {
    if (open && !uploadPreview) refetch()
  }

  const renderIframe = () =>
    previewUrl ? (
      <iframe
        src={previewUrl}
        className='absolute inset-0 size-full rounded-md border'
      />
    ) : (
      <div className='flex justify-center items-center size-full'>
        <p className='text-sm text-muted-foreground'>No preview available</p>
      </div>
    )

  const renderContent = () => {
    if (uploadPreview) return renderIframe()

    if (isFetching || isLoading) {
      return (
        <div className='absolute inset-0 flex flex-col justify-center items-center gap-2 size-full'>
          <Loader2 className='size-12 animate-spin' />
          <p className='text-sm text-muted-foreground'>Generating preview...</p>
        </div>
      )
    }

    if (data?.data?.url) {
      return renderIframe()
    }

    return (
      <div className='absolute inset-0 flex flex-col justify-center items-center size-full gap-2'>
        <p className='text-sm text-muted-foreground'>No preview available</p>
        <Button variant='outline' onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <Dialog onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant='ghost' size='icon'>
          <Eye className='size-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[80vw] min-h-[90vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle>Document Preview</DialogTitle>
          <DialogDescription>
            {fileName || 'Preview the document here'}
          </DialogDescription>
        </DialogHeader>
        <div className='relative flex-1'>{renderContent()}</div>
      </DialogContent>
    </Dialog>
  )
}
