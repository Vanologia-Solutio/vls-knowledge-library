'use client'

import { UploadDocument } from '@/shared/entities/document'
import dayjs from 'dayjs'
import { DocumentViewer } from '../document-viewer'

export function InvoicerTable({ data }: { data: UploadDocument[] }) {
  return (
    <div>
      {data && data.length > 0 ? (
        data.map(document => (
          <div key={document.id}>
            <h1>{document.no}</h1>
            <p>{document.type}</p>
            <p>{document.client_name}</p>
            <p>{document.amount}</p>
            <p>
              {document.issued_date
                ? dayjs(document.issued_date).format('D MMMM YYYY')
                : 'N/A'}
            </p>
            <p>
              {document.due_date
                ? dayjs(document.due_date).format('D MMMM YYYY')
                : 'N/A'}
            </p>
            <p className='line-clamp-2'>{document.remark}</p>
            <DocumentViewer path={document.file_path} />
          </div>
        ))
      ) : (
        <div className='flex justify-center items-center size-full'>
          <p className='text-sm text-muted-foreground'>No data</p>
        </div>
      )}
    </div>
  )
}
