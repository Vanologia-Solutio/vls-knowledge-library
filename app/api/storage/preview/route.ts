import { bucket } from '@/lib/gcp/storage'
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '@/shared/helpers/api-response'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const path = searchParams.get('path')
    if (!path) {
      return NextResponse.json(generateErrorResponse('Path is required'))
    }
    const file = bucket.file(path)

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 10 * 60 * 1000,
    })

    return NextResponse.json(
      generateSuccessResponse({ url }, 'Document previewed successfully'),
    )
  } catch (error) {
    return NextResponse.json(
      generateErrorResponse(
        error instanceof Error ? error.message : 'Error previewing document',
      ),
    )
  }
}
