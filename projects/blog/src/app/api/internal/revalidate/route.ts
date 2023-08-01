import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import logger from '@xc/lib/logger'
import getSitemapItems from '@xc/shared/data/blog/getSitemapItems'

export async function POST() {
  const result = await getSitemapItems()
  const data = result.data ?? []

  if (!result.ok) {
    logger.error(result, 'API (Internal): Revalidate')
  }

  for (const item of data) {
    revalidatePath(item.url)
  }

  logger.info('API (Internal): Static content was revalidated')

  return NextResponse.json({ ok: true })
}
