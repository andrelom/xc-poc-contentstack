import { blog } from '@xc/shared/clients/contentstack'

export type HomePageData = {
  hero_section: Contentstack.Globals.HeroSection
  open_graph: Contentstack.Globals.OpenGraph
}

export default async function getHomePage(): Promise<Core.Result<HomePageData>> {
  const result = await blog.api.find<HomePageData>('page_home', (query) => {
    return query.toJSON()
  })

  if (!result.ok) {
    return { ok: false, error: result.error }
  }

  const item = result.data?.shift()

  if (!item) {
    return { ok: false, error: 'Not Found' }
  }

  return { ok: true, data: item }
}
