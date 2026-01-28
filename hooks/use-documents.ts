import { documentService } from '@/services/document-service'
import { storageService } from '@/services/storage-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const DOCUMENT_QUERY_KEYS = {
  all: ['documents'] as const,
  list: () => [...DOCUMENT_QUERY_KEYS.all, 'list'] as const,
  preview: (path: string) =>
    [...DOCUMENT_QUERY_KEYS.all, 'preview', path] as const,
  upload: () => [...DOCUMENT_QUERY_KEYS.all, 'upload'] as const,
}

export const documentQueries = {
  keys: DOCUMENT_QUERY_KEYS,

  useList: () =>
    useQuery({
      queryKey: documentQueries.keys.list(),
      queryFn: () => documentService.getDocuments(),
      placeholderData: prev => prev,
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
        queryClient.invalidateQueries({ queryKey: documentQueries.keys.list() })
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
