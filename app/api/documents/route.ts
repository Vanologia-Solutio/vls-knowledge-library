import { getSupabaseServerClient } from '@/lib/supabase/server'
import {
  generateErrorResponse,
  generatePaginatedResponse,
} from '@/shared/helpers/api-response'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const supabase = await getSupabaseServerClient()
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get('page') ?? 1)
    const limit = Number(searchParams.get('limit') ?? 10)

    const from = (page - 1) * limit
    const to = from + limit - 1

    const countQuery = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('creation_date', { ascending: false })
      .range(from, to)
    if (error) throw error

    const pagination = {
      currentPage: page,
      pageSize: limit,
      total: countQuery.count ?? 0,
      totalPages: Math.ceil((countQuery.count ?? 0) / limit),
    }

    return NextResponse.json(
      generatePaginatedResponse(
        data,
        pagination,
        'Documents fetched successfully',
      ),
    )
  } catch (error) {
    return NextResponse.json(
      generateErrorResponse(
        error instanceof Error ? error.message : 'Error fetching documents',
      ),
    )
  }
}
