import { DocumentRepository } from '@/repositories/document-repository'
import { UploadDocument } from '@/shared/entities/document'
import { PaginatedResponse } from '@/shared/helpers/api-response'
import { PaginationState } from '@tanstack/react-table'

class DocumentService {
  private documentRepo = new DocumentRepository()

  async getDocuments(
    params: PaginationState,
  ): Promise<PaginatedResponse<UploadDocument>> {
    return await this.documentRepo.getDocuments(params)
  }
}

export const documentService = new DocumentService()
