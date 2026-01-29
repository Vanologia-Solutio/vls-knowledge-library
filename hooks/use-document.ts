import { documentService } from '@/services/document-service'
import { storageService } from '@/services/storage-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'

const DOCUMENT_QUERY_KEYS = {
  all: ['documents'] as const,
  list: (params: PaginationState = { pageIndex: 0, pageSize: 10 }) =>
    [
      ...DOCUMENT_QUERY_KEYS.all,
      'list',
      params.pageIndex,
      params.pageSize,
    ] as const,
  preview: (path: string) =>
    [...DOCUMENT_QUERY_KEYS.all, 'preview', path] as const,
  upload: () => [...DOCUMENT_QUERY_KEYS.all, 'upload'] as const,
}

export const documentQueries = {
  keys: DOCUMENT_QUERY_KEYS,

  useList: (params: PaginationState = { pageIndex: 0, pageSize: 10 }) =>
    useQuery({
      queryKey: documentQueries.keys.list(params),
      queryFn: () => documentService.getDocuments(params),
      enabled: params.pageIndex >= 0 && params.pageSize > 0,
    }),

  useUpload: () => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationKey: documentQueries.keys.upload(),
      mutationFn: (payload: {
        file: File
        type: string
        no: string
        clientName: string
        amount: string
        issuedDate: string
        dueDate: string
        remark: string
      }) => storageService.uploadDocument(payload),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: documentQueries.keys.all })
      },
    })
  },

  usePreview: (path: string, enabled: boolean = false) =>
    useQuery({
      queryKey: documentQueries.keys.preview(path),
      queryFn: () => storageService.getSignedUrl(path),
      enabled,
    }),
}
