import { Env } from '@/shared/constants/environments'
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(Env.COOKIE_NAME)
  return response
}
