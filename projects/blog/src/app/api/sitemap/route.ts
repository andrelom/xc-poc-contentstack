import { NextResponse } from 'next/server'
import { toSitemapXML } from '@xc/lib/sitemap'
import getSitemapItems from '@xc/shared/data/blog/getSitemapItems'

export const revalidate = 5

export const dynamic = 'force-static'

export async function GET() {
  const result = await getSitemapItems()

  if (!result.ok) {
    return NextResponse.json({ ok: false }, { status: 404 })
  }

  const xml = toSitemapXML(result.data ?? [])

  return new NextResponse(xml, {
    headers: {
      [`content-type`]: 'application/xml',
    },
  })
}
