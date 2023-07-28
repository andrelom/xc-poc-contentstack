import { blog } from '@xc/shared/clients/contentstack'
import GetAllPostsQuery from './queries/GetAllPostsQuery.graphql'

export type PostsPageData = {
  page: {
    title: string
    subtitle: string
    description: string
    open_graph: {
      og_title: string
      og_description: string
    }
  }
  posts: {
    items: [
      {
        title: string
        url: string
        system: {
          created_at: string
        }
      },
    ]
  }
}

export default async function getPostsPage(): Promise<Core.Result<PostsPageData>> {
  const response = await blog.gql.query({
    query: GetAllPostsQuery,
  })

  if (!response || response.error) {
    return { ok: false, error: 'Not Found' }
  }

  const item: PostsPageData = {
    page: response.data.page.items.shift(),
    posts: response.data.posts.items,
  }

  return { ok: true, data: item }
}
