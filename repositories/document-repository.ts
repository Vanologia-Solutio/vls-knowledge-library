import { UploadDocument } from '@/shared/entities/document'
import { ApiResponse } from '@/shared/helpers/api-response'

export class DocumentRepository {
  async getDocuments(): Promise<ApiResponse<UploadDocument[]>> {
    const res = await fetch('/api/documents')
    if (!res.ok) {
      throw new Error('Failed to get documents')
    }
    const data = await res.json()
    return data
  }
}
