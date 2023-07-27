import { blog } from '@xc/shared/clients/contentstack'

export type PostsPageData = Contentstack.Item<{
  subtitle: string
  description: string
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getPostsPage(): Promise<Core.Result<PostsPageData>> {
  const result = await blog.api.find<PostsPageData>('page_posts', (query) => {
    return query.toJSON()
  })

  if (!result.ok) {
    return { ok: false, error: result.error }
  }

  const item = result.data?.shift()

  if (!item) {
    return { ok: false, error: 'Not Found' }
  }

  return { ok: true, data: item }
}
