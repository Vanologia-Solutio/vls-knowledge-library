import { ApiResponse } from '@/shared/helpers/api-response'

export class StorageRepository {
  async getSignedUrl(path: string): Promise<ApiResponse<{ url: string }>> {
    const res = await fetch(`/api/storage/preview?path=${path}`)
    if (!res.ok) {
      throw new Error('Failed to preview document')
    }
    const data = await res.json()
    return data
  }

  async uploadDocument(formData: FormData): Promise<
    ApiResponse<{
      fullPath: string
      id: string
      path: string
    }>
  > {
    const res = await fetch('/api/storage/upload', {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) {
      throw new Error('Failed to upload document')
    }
    const data = await res.json()
    return data
  }
}
