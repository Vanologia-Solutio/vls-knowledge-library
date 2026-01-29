export const Env: {
  APP_URL: string
  SUPABASE_URL: string
  SUPABASE_PUBLISHABLE_DEFAULT_KEY: string
  GCP_PROJECT_ID: string
  GCP_CLIENT_EMAIL: string
  GCP_PRIVATE_KEY: string
  GCS_BUCKET: string
  COOKIE_NAME: string
  COOKIE_MAX_AGE: number
  COOKIE_SIGNING_SECRET: string
} = {
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? '',
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  SUPABASE_PUBLISHABLE_DEFAULT_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ?? '',
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID ?? '',
  GCP_CLIENT_EMAIL: process.env.GCP_CLIENT_EMAIL ?? '',
  GCP_PRIVATE_KEY: process.env.GCP_PRIVATE_KEY ?? '',
  GCS_BUCKET: process.env.GCS_BUCKET ?? '',
  COOKIE_NAME: process.env.COOKIE_NAME ?? '',
  COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE
    ? parseInt(process.env.COOKIE_MAX_AGE)
    : 5 * 60, // 5 minutes in seconds
  COOKIE_SIGNING_SECRET: process.env.COOKIE_SIGNING_SECRET ?? '',
}
