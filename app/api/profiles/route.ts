import { getSupabaseServerClient } from '@/lib/supabase/server'
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '@/shared/helpers/api-response'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    const { data } = await supabase.from('profiles').select('*')
    if (!data || data.length === 0) {
      return NextResponse.json(
        generateSuccessResponse(null, 'No profile found'),
      )
    }

    return NextResponse.json(
      generateSuccessResponse(data, 'Profile fetched successfully'),
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      generateErrorResponse(
        error instanceof Error ? error.message : 'Error fetching profiles',
      ),
    )
  }
}
