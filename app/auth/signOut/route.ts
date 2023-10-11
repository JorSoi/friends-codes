import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request : NextRequest) {
  const requestUrl = new URL(request.url)
  const supabase = createRouteHandlerClient({ cookies })
  const result = await supabase.auth.signOut()

  return NextResponse.redirect(`${requestUrl.origin}`, {
    status: 301,
  })
}