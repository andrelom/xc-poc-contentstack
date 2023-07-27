import './globals.css'

import getRootLayot from '@xc/shared/data/blog/getRootLayout'

import { Root } from '@/layout'

export default async function Layout({ children }: Core.Layout) {
  const result = await getRootLayot({})

  return (
    <html lang="en">
      <body>
        <Root data={result.data}>{children}</Root>
      </body>
    </html>
  )
}
