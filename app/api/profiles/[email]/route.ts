import { getSupabaseServerClient } from '@/lib/supabase/server'
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '@/shared/helpers/api-response'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  try {
    const supabase = await getSupabaseServerClient()
    const { email } = await params

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()
    if (!data)
      return NextResponse.json(
        generateSuccessResponse(null, 'Profile not found'),
      )
    if (error) throw error

    return NextResponse.json(
      generateSuccessResponse(data, 'Profile fetched successfully'),
    )
  } catch (error) {
    return NextResponse.json(
      generateErrorResponse(
        error instanceof Error ? error.message : 'Error fetching profile',
      ),
    )
  }
}
