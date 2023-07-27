import { blog } from '@xc/shared/clients/contentstack'

export type RootLayoutData = {
  group_header: {
    file_logo: Contentstack.Fields.File
  }
}

export default async function getRootLayout({}: {}) {
  const result = await blog.find<RootLayoutData>('layout_root', (query) => {
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
