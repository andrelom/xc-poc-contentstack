import Result from '@xc/lib/Result'
import { blog } from '@xc/shared/clients/contentstack'

export type GenericPageData = Contentstack.Item<{
  modular_blocks_main: Record<string, any>[]
  open_graph: Contentstack.Globals.OpenGraph
}>

export default async function getGenericPage({ path }: { path: string }): Promise<Result<GenericPageData>> {
  const result = await blog.api.find<GenericPageData>('page_generic', (query) => {
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
