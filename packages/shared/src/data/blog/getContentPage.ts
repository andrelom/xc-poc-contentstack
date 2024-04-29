import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { createBlogClient } from '@xc/shared/clients/contentstack'

export type PageData = Contentstack.Item<{
  title: string
  url: string
  body: string
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getContentPage({
  path,
  preview,
}: {
  path: string
  preview?: LivePreviewQuery
}): Promise<Result<PageData>> {
  const result = await createBlogClient().api.find<PageData>('content_page', preview, (query) => {
    return query.where('key', path).toJSON()
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
