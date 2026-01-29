import { UploadDocument } from '@/shared/entities/document'
import { PaginatedResponse } from '@/shared/helpers/api-response'
import { PaginationState } from '@tanstack/react-table'

export class DocumentRepository {
  async getDocuments(
    params: PaginationState,
  ): Promise<PaginatedResponse<UploadDocument>> {
    const res = await fetch(
      `/api/documents?page=${params.pageIndex + 1}&limit=${params.pageSize}`,
    )
    if (!res.ok) {
      throw new Error('Failed to get documents')
    }
    const data = await res.json()
    return data
  }
}
