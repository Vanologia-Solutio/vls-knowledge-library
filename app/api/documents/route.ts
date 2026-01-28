import { getSupabaseServerClient } from '@/lib/supabase/server'
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '@/shared/helpers/api-response'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()
    const { data } = await supabase
      .from('documents')
      .select('*')
      .order('creation_date', { ascending: false })
    return NextResponse.json(
      generateSuccessResponse(data, 'Documents fetched successfully'),
    )
  } catch (error) {
    return NextResponse.json(
      generateErrorResponse(
        error instanceof Error ? error.message : 'Error fetching documents',
      ),
    )
  }
}
