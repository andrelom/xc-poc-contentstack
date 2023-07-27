import type { ApolloCache, NormalizedCacheObject } from '@apollo/client'

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, concat } from '@apollo/client'

// This function retrieves an Apollo Client or generates a new one. However, it is
// important to note that it will consistently return a fresh client if executed
// on the server side (when the 'window' object is undefined). Conversely, it will
// reuse the existing client if executed on the client side.
export function createApolloClient(options: {
  url: URL
  headers?: Record<string, string>
  cache?: ApolloCache<NormalizedCacheObject>
}) {
  const uri = options.url.toString()
  const link = new HttpLink({ uri })

  options.headers = options.headers ?? {}
  options.cache = options.cache ?? new InMemoryCache()

  const middleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: { ...headers, ...options.headers },
    }))

    return forward(operation)
  })

  return new ApolloClient({
    ssrMode: true,
    link: concat(middleware, link),
    cache: options.cache,
  })
}
