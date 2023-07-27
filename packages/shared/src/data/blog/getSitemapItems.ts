import type { SitemapItem } from '@xc/lib/sitemap'

import { blog } from '@xc/shared/clients/contentstack'
import GetSitemapQuery from './queries/GetSitemapQuery.graphql'

const toSitemapItems = ({ items }: { items: any[] }) => {
  return items.map<SitemapItem>((item: any) => ({
    url: item.url ?? '/',
    date: item.system.updated_at,
  }))
}

export default async function getSitemapItems() {
  const response = await blog.gql.query({
    query: GetSitemapQuery,
  })

  if (!response || response.error) {
    return { ok: false, error: 'Not Found' }
  }

  const list = [
    toSitemapItems(response.data.all_page_home),
    toSitemapItems(response.data.all_page_generic),
    toSitemapItems(response.data.all_page_post),
  ]

  return { ok: true, data: list.flat() }
}
