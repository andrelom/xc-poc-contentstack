import logger from '@xc/lib/logger'
import { blog } from '@xc/shared/clients/contentstack'

export type RootLayoutData = Contentstack.Item<{
  image_header_logo: Contentstack.Fields.File
  mb_header_navigation: {
    item: {
      link: Contentstack.Fields.Link
    }
  }[]
}>

export default async function getRootLayout(): Promise<Core.Result<RootLayoutData>> {
  const result = await blog.api.find<RootLayoutData>('layout_root', (query) => {
    return query.toJSON()
  })

  if (!result.ok) {
    logger.error(result, 'Get Root Layout')

    return { ok: false, error: result.error }
  }

  const item = result.data?.shift()

  if (!item) {
    return { ok: false, error: 'Not Found' }
  }

  return { ok: true, data: item }
}
