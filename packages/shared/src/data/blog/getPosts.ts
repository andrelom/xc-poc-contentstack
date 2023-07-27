import { blog } from '@xc/shared/clients/contentstack'
import GetAllPosts from './queries/GetAllPosts.graphql'

export type PostsData = {
  title: string
  url: string
}[]

export default async function getPosts(): Promise<Core.Result<PostsData>> {
  const response = await blog.gql.query({
    query: GetAllPosts,
  })

  if (!response || response.error) {
    return { ok: false, error: 'Not Found' }
  }

  const data: PostsData = response.data.all_page_post.items

  return { ok: true, data }
}
