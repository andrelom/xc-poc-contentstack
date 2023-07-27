import getRootLayot from '@xc/shared/data/blog/getRootLayout'

import { Root } from '@/layout'

export default async function Layout({ children }: Core.Layout) {
  const result = await getRootLayot()

  return (
    <>
      <Root data={result.data}>{children}</Root>
    </>
  )
}
