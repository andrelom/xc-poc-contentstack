'use client'

import { useEffect } from 'react'
import setLivePreview from './setLivePreview'

export default function LivePreview({}: {}) {
  useEffect(() => {
    setLivePreview()
  }, [])

  return null
}
