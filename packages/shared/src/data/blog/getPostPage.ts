import { blog } from '@xc/shared/clients/contentstack'

export type PostPageData = Contentstack.Item<{
  description: string
  body: string
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getPostPage({ path }: { path: string }): Promise<Core.Result<PostPageData>> {
  const result = await blog.api.find<PostPageData>('page_post', (query) => {
    return query.where('url', path).toJSON()
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
