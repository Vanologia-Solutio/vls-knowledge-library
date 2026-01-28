import { Env } from '@/shared/constants/environments'
import { Storage } from '@google-cloud/storage'

export const storage = new Storage({
  projectId: Env.GCP_PROJECT_ID,
  credentials: {
    client_email: Env.GCP_CLIENT_EMAIL,
    private_key: Env.GCP_PRIVATE_KEY,
  },
})

export const bucket = storage.bucket(Env.GCS_BUCKET)
