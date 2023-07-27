import { NextResponse } from 'next/server'
import { toSitemapXML } from '@xc/lib/sitemap'
import getSitemap from '@xc/shared/data/blog/getSitemap'

export async function GET() {
  const result = await getSitemap()

  if (!result.ok) {
    return NextResponse.json({ ok: false }, { status: 404 })
  }

  const xml = toSitemapXML(result.data ?? [])

  return new NextResponse(xml, {
    headers: {
      [`content-type`]: 'application/xml',
      [`cache-control`]: 'private, no-cache, no-store, max-age=0, must-revalidate',
    },
  })
}
