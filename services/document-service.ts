import { DocumentRepository } from '@/repositories/document-repository'
import { UploadDocument } from '@/shared/entities/document'
import { ApiResponse } from '@/shared/helpers/api-response'

class DocumentService {
  private documentRepo = new DocumentRepository()

  async getDocuments(): Promise<ApiResponse<UploadDocument[]>> {
    return await this.documentRepo.getDocuments()
  }
}

export const documentService = new DocumentService()
