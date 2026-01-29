import { Profile } from '@/shared/entities/profile'
import { ApiResponse } from '@/shared/helpers/api-response'

export class ProfileRepository {
  async getProfileByEmail(email: string): Promise<ApiResponse<Profile>> {
    const res = await fetch(`/api/profiles/${email}`)
    if (!res.ok) {
      throw new Error('Failed to get profile by email')
    }
    const data = await res.json()
    return data
  }
}
