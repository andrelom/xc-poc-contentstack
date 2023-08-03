'use client'

import { useEffect } from 'react'
import setLivePreview from './setLivePreview'

export default function LivePreview({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setLivePreview()
  }, [])

  return <>{children}</>
}
