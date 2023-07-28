import type { SitemapItem } from '@xc/lib/sitemap'

import logger from '@xc/lib/logger'
import { blog } from '@xc/shared/clients/contentstack'

export type SitemapItemsData = SitemapItem[]

const getPagesEntries = async (type: string) => {
  const result = await blog.api.find(type, (query) => {
    return query.only(['url', 'updated_at']).toJSON()
  })

  if (!result.ok) {
    logger.error(result, `Get Sitemap Items: For type '${type}'`)
  }

  return result.data ?? []
}

const toSitemapItems = (pages: any[]) => {
  return pages.map<SitemapItem>((page: any) => ({
    url: page.url,
    date: page.updated_at,
  }))
}

export default async function getSitemapItems(): Promise<Core.Result<SitemapItemsData>> {
  const types = process.env.APP_SITEMAP_PAGE_TYPES?.split(',').map((type) => type.trim()) ?? []
  const pages = await Promise.all(types.map((type) => getPagesEntries(type)))
  const items = pages.map((page) => toSitemapItems(page))

  return { ok: true, data: items.flat() }
}
