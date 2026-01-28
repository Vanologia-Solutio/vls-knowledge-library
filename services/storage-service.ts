import { StorageRepository } from '@/repositories/storage-repository'
import { ApiResponse } from '@/shared/helpers/api-response'

class StorageService {
  private storageRepo = new StorageRepository()

  async getSignedUrl(path: string): Promise<ApiResponse<{ url: string }>> {
    return await this.storageRepo.getSignedUrl(path)
  }

  async uploadDocument(payload: {
    file: File
    type: string
    no: string
    clientName: string
    amount: string
    issuedDate: string
    dueDate: string
  }): Promise<
    ApiResponse<{
      fullPath: string
      id: string
      path: string
    }>
  > {
    const formData = new FormData()
    formData.append('file', payload.file)
    formData.append('type', payload.type)
    formData.append('no', payload.no)
    formData.append('clientName', payload.clientName)
    formData.append('amount', payload.amount)
    formData.append('issuedDate', payload.issuedDate)
    formData.append('dueDate', payload.dueDate)
    return await this.storageRepo.uploadDocument(formData)
  }
}

export const storageService = new StorageService()
