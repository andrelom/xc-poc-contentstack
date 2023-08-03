'use client'

import { useEffect } from 'react'
import initialize from './initialize'

export default function LivePreview({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initialize()
  }, [])

  return <>{children}</>
}
