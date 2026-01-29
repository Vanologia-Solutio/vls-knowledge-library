'use client'

import { PaginatedDataTable } from '@/components/paginated-table'
import { documentQueries } from '@/hooks/use-documents'
import { formatCurrency } from '@/lib/utils'
import { UploadDocument } from '@/shared/entities/document'
import { ColumnDef, PaginationState } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useState } from 'react'
import { DocumentViewer } from '../document-viewer'

export function InvoiceTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, isFetching } = documentQueries.useList(pagination)

  const columns: ColumnDef<UploadDocument>[] = [
    {
      header: 'Invoice No',
      accessorKey: 'no',
      enableSorting: true,
    },
    {
      header: 'Client Name',
      accessorKey: 'client_name',
      enableSorting: true,
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      enableSorting: true,
      cell: ({ row }) => <p>{formatCurrency(row.original.amount)}</p>,
    },
    {
      header: 'Issued Date',
      accessorKey: 'issued_date',
      enableSorting: true,
      cell: ({ row }) => (
        <p>
          {row.original.issued_date
            ? dayjs(row.original.issued_date).format('D MMM YYYY')
            : '-'}
        </p>
      ),
    },
    {
      header: 'Due Date',
      accessorKey: 'due_date',
      enableSorting: true,
      cell: ({ row }) => (
        <p>
          {row.original.due_date
            ? dayjs(row.original.due_date).format('D MMM YYYY')
            : '-'}
        </p>
      ),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      enableSorting: false,
      cell: ({ row }) => (
        <DocumentViewer
          path={row.original.file_path}
          fileName={row.original.file_name}
        />
      ),
    },
  ]

  return (
    <PaginatedDataTable
      states={{ isLoading: isLoading || isFetching }}
      data={data?.data ?? []}
      columns={columns}
      pagination={pagination}
      paginationData={
        data?.pagination || {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          totalPages: 1,
        }
      }
      handlers={{ onPaginationChange: setPagination }}
    />
  )
}
