import { blog } from '@xc/shared/clients/contentstack'
import GetSitemapQuery from './queries/GetSitemapQuery.graphql'

const map = ({ items }: { items: Record<string, any>[] }) => {
  return items.map((item: any) => ({
    url: item.url ?? '/',
    updated_at: item.system.updated_at,
  }))
}

export default async function getSitemap() {
  const response = await blog.gql.query({
    query: GetSitemapQuery,
  })

  if (!response || response.error) {
    return { ok: false, error: 'Not Found' }
  }

  return {
    ok: true,
    data: {
      all_page_home: map(response.data.all_page_home),
      all_page_generic: map(response.data.all_page_generic),
      all_page_post: map(response.data.all_page_post),
    },
  }
}
