import { blog } from '@xc/shared/clients/contentstack'

export type GenericPageData = {
  modular_blocks_main: Record<string, any>[]
  open_graph: Contentstack.Globals.OpenGraph
}

export default async function getGenericPage({ path }: { path: string }): Promise<Core.Result<GenericPageData>> {
  const result = await blog.api.find<GenericPageData>('page_generic', (query) => {
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
