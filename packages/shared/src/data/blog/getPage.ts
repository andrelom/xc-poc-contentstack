import type { LivePreviewQuery } from 'contentstack'

import Result from '@xc/lib/Result'
import { blog } from '@xc/shared/clients/contentstack'

export type PageData = Contentstack.Item<{
  title: string
  url: string
  components: Record<string, any>[]
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getPage({
  path,
  preview,
}: {
  path: string
  preview?: LivePreviewQuery
}): Promise<Result<PageData>> {
  const result = await blog.api.find<PageData>('page', preview, (query) => {
    return query.where('url', path).includeReference(['components','components.team_members']).toJSON()
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
