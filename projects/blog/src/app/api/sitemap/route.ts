import { NextResponse } from 'next/server'
import logger from '@xc/lib/logger'
import { toSitemapXML } from '@xc/lib/sitemap'
import getSitemapItems from '@xc/shared/data/blog/getSitemapItems'
import settings from '@/settings'

export const revalidate = settings.revalidate

export const dynamic = 'force-static'

export async function GET() {
  const result = await getSitemapItems()

  if (!result.ok) {
    return NextResponse.json({ ok: false }, { status: 404 })
  }

  const xml = toSitemapXML(result.data ?? [])

  logger.info('The Sitemap was generated')

  return new NextResponse(xml, {
    headers: {
      [`content-type`]: 'application/xml',
    },
  })
}
