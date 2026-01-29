import { getSupabaseServerClient } from '@/lib/supabase/server'
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '@/shared/helpers/api-response'
import { NextResponse } from 'next/server'

export async function PUT({
  params,
}: {
  params: Promise<{ profileId: string }>
}) {
  try {
    const supabase = await getSupabaseServerClient()
    const { profileId } = await params
    console.log(profileId)

    const { data: existingFootprint } = await supabase
      .from('footprints')
      .select('*')
      .eq('profile_id', profileId)
      .single()
    if (!existingFootprint)
      return NextResponse.json(
        generateSuccessResponse(null, 'Footprint not found'),
      )

    const { data, error } = await supabase
      .from('footprints')
      .update({
        login_count: existingFootprint.login_count + 1,
        last_updated: new Date(),
      })
      .eq('profile_id', profileId)

    if (error) throw error

    return NextResponse.json(
      generateSuccessResponse(data, 'Footprint updated successfully'),
    )
  } catch (error) {
    return NextResponse.json(
      generateErrorResponse(
        error instanceof Error ? error.message : 'Error updating footprint',
      ),
    )
  }
}
