import { Env } from '@/shared/constants/environments'
import { createBrowserClient } from '@supabase/ssr'

export const supabaseBrowser = createBrowserClient(
  Env.SUPABASE_URL,
  Env.SUPABASE_PUBLISHABLE_DEFAULT_KEY,
)
