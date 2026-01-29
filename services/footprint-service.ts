import { FootprintRepository } from '@/repositories/footprint-repository'
import { ApiResponse } from '@/shared/helpers/api-response'

class FootprintService {
  private footprintRepo = new FootprintRepository()

  async updateFootprintByProfileId(
    profileId: string,
  ): Promise<ApiResponse<any>> {
    return await this.footprintRepo.updateFootprintByProfileId(profileId)
  }
}

export const footprintService = new FootprintService()
