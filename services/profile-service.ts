import { ProfileRepository } from '@/repositories/profile-repository'
import { Profile } from '@/shared/entities/profile'
import { ApiResponse } from '@/shared/helpers/api-response'

class ProfileService {
  private profileRepo = new ProfileRepository()

  async getProfileByEmail(email: string): Promise<ApiResponse<Profile>> {
    return await this.profileRepo.getProfileByEmail(email)
  }
}

export const profileService = new ProfileService()
