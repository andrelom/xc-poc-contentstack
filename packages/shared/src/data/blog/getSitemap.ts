import { blog } from '@xc/shared/clients/contentstack'
import GetSitemapQuery from './queries/GetSitemapQuery.graphql'

export default async function getSitemap() {
  const response = await blog.gql.query({
    query: GetSitemapQuery,
  })

  if (!response || response.error) {
    return { ok: false, error: 'Not Found' }
  }

  return { ok: true, data: {} }
}
