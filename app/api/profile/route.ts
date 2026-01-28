import { getSupabaseServerClient } from "@/lib/supabase/server";
import { generateErrorApiResponse, generateSuccessApiResponse } from "@/shared/helpers/api-response";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await getSupabaseServerClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return NextResponse.json(
      generateErrorApiResponse(error?.message ?? 'Unauthorized'),
      { status: 401 }
    )
  }

  return NextResponse.json(generateSuccessApiResponse({
    id: user.id,
    email: user.email,
    role: user.role,
  }), { status: 200 })
}
