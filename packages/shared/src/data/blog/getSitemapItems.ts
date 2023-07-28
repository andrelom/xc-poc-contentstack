import type { SitemapItem } from '@xc/lib/sitemap'

import { blog } from '@xc/shared/clients/contentstack'

const types = ['page_home', 'page_generic', 'page_posts', 'page_post']

const getPagesEntries = async (type: string) => {
  const result = await blog.api.find(type, (query) => {
    return query.only(['uid', 'url', 'updated_at']).toJSON()
  })

  return result.data ?? []
}

const toSitemapItems = (pages: any[]) => {
  return pages.map<SitemapItem>((page: any) => ({
    url: page.url,
    date: page.updated_at,
  }))
}

export type SitemapItemsData = SitemapItem[]

export default async function getSitemapItems(): Promise<Core.Result<SitemapItemsData>> {
  const pages = await Promise.all(types.map((type) => getPagesEntries(type)))
  const items = pages.map((page) => toSitemapItems(page))

  return { ok: true, data: items.flat() }
}
