import { bucket } from '@/lib/gcp/storage'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import {
  generateErrorResponse,
  generateSuccessResponse,
} from '@/shared/helpers/api-response'
import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const formData = await req.formData()

    const file = formData.get('file') as File
    const type = formData.get('type') as string
    const no = formData.get('no') as string
    const clientName = formData.get('clientName') as string
    const amount = formData.get('amount') as string
    const issuedDate = formData.get('issuedDate') as string
    const dueDate = formData.get('dueDate') as string
    const remark = formData.get('remark') as string

    if (!file || !type) {
      return NextResponse.json(generateErrorResponse('Invalid form data'))
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const folder = type.toLowerCase() + 's'
    const filePath = `${folder}/${randomUUID()}-${file.name}`

    const blob = bucket.file(filePath)

    await blob.save(buffer, {
      contentType: file.type,
      resumable: false,
      metadata: {
        cacheControl: 'private, max-age=0',
      },
    })

    const { error } = await supabase.from('documents').insert({
      created_by: user?.email,
      type,
      no,
      client_name: clientName,
      file_name: file.name,
      file_path: filePath,
      amount: parseInt(amount),
      issued_date: issuedDate ? new Date(issuedDate) : null,
      due_date: dueDate ? new Date(dueDate) : null,
      remark: remark,
    })
    if (error) {
      return NextResponse.json(generateErrorResponse(error.message))
    }

    return NextResponse.json(
      generateSuccessResponse(
        { path: filePath, fileName: file.name },
        'File uploaded successfully',
      ),
    )
  } catch (error) {
    return NextResponse.json(
      generateErrorResponse(
        error instanceof Error ? error.message : 'Upload failed',
      ),
    )
  }
}
