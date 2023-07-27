import { NextResponse } from 'next/server'
import getSitemap from '@xc/shared/data/blog/getSitemap'

export async function GET() {
  const result = await getSitemap()

  return NextResponse.json(result, {
    headers: {
      'cache-control': 'private, no-cache, no-store, max-age=0, must-revalidate',
    },
  })
}
