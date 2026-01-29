import { ApiResponse } from '@/shared/helpers/api-response'

export class FootprintRepository {
  async updateFootprintByProfileId(
    profileId: string,
  ): Promise<ApiResponse<any>> {
    const res = await fetch(`/api/footprints/${profileId}`)
    if (!res.ok) {
      throw new Error('Failed to update footprint')
    }
    const data = await res.json()
    return data
  }
}
