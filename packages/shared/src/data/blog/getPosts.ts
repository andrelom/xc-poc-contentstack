import logger from '@xc/lib/logger'
import { blog } from '@xc/shared/clients/contentstack'

export type PostData = Contentstack.Item<{
  title: string
  url: string
  created_at: string
}>

export default async function getPosts(): Promise<Core.Result<PostData[]>> {
  const result = await blog.api.find<PostData>('page_post', (query) => {
    return query.only(['title', 'url', 'created_at']).limit(10).toJSON()
  })

  if (!result.ok) {
    logger.error(result, 'Get Posts')

    return { ok: false, error: result.error }
  }

  return { ok: true, data: result.data ?? [] }
}
