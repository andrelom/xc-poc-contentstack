import './globals.css'

import { Root } from '@/layout'

export default function Layout({ children }: Core.Layout) {
  return (
    <html lang="en">
      <body>
        <Root data={{}}>{children}</Root>
      </body>
    </html>
  )
}
