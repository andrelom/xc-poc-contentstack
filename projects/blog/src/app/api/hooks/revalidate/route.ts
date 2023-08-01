import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import logger from '@xc/lib/logger'
import getSitemapItems from '@xc/shared/data/blog/getSitemapItems'

export async function POST() {
  const result = await getSitemapItems()
  const data = result.data ?? []

  if (!result.ok) {
    logger.error(result, 'Hooks Revalidate')
  }

  for (const item of data) {
    revalidatePath(item.url)
  }

  return NextResponse.json({ ok: true })
}
