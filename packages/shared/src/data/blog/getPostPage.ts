import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { blog } from '@xc/shared/clients/contentstack'

export type PostPageData = Contentstack.Item<{
  description: string
  body: string
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getPostPage({
  path,
  query,
}: {
  path: string
  query?: LivePreviewQuery
}): Promise<Result<PostPageData>> {
  blog.api.setLivePreviewQuery(query)

  const result = await blog.api.find<PostPageData>('page_post', (query) => {
    return query.where('url', path).toJSON()
  })

  if (!result.ok) {
    return Result.from(result)
  }

  const item = result.data?.shift()

  if (!item) {
    return Result.fail('Not Found')
  }

  return Result.success(item)
}
