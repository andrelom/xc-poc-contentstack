import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { blog } from '@xc/shared/clients/contentstack'

export type ArticlePageData = Contentstack.Item<{
  article_title: string
  url: string
  page_components: Record<string, any>[]
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getPage({
  path,
  preview,
}: {
  path: string
  preview?: LivePreviewQuery
}): Promise<Result<ArticlePageData>> {
  const result = await blog.api.find<ArticlePageData>('article_page', preview, (query) => {
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
