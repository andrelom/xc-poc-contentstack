import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import Result from '@xc/lib/Result'
import logger from '@xc/lib/logger'
import getSitemapItems from '@xc/shared/data/blog/getSitemapItems'

export async function POST(request: Request) {
  const token = request.headers.get('x-webhook-token')

  if (process.env.APP_WEBHOOK_TOKEN !== token) {
    return NextResponse.json(Result.fail('Unauthorized'), { status: 401 })
  }

  const result = await getSitemapItems()
  const items = result.data ?? []

  if (!result.ok) {
    logger.error(result, 'Internal API: Revalidate')
  }

  for (const item of items) {
    revalidatePath(item.url)
  }

  logger.info('Internal API: Triggered static content regeneration')

  return NextResponse.json(Result.success())
}
