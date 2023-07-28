import { blog } from '@xc/shared/clients/contentstack'
import GetAllPostsQuery from './queries/GetAllPostsQuery.graphql'

export type PostsData = {
  page: {
    items: [
      {
        title: string
        subtitle: string
        description: string
        open_graph: {
          og_title: string
          og_description: string
        }
      },
    ]
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

export default async function getPostsPage(): Promise<Core.Result<PostsData>> {
  const response = await blog.gql.query({
    query: GetAllPostsQuery,
  })

  if (!response || response.error) {
    return { ok: false, error: 'Not Found' }
  }

  const item: PostsData = response.data.all_page_post.items

  return { ok: true, data: item }
}
