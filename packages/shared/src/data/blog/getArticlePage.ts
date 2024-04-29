import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { createBlogClient } from '@xc/shared/clients/contentstack'

export type ArticlePageData = Contentstack.Item<{
  article_title: string
      article_summary: string
      article_image: any
      article_date: Date
      article_body: string,
      disclaimer: any
    open_graph: Contentstack.Globals.OpenGraph
    $?: any
}>

export default async function getArticlePage({
  path,
  preview,
}: {
  path: string
  preview?: LivePreviewQuery
}): Promise<Result<ArticlePageData>> {
  const result = await createBlogClient().api.find<ArticlePageData>('article_page', preview, (query) => {
    return query
      .where('url', path)
      .includeReference(['disclaimer'])
      .toJSON()
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
