const livepreview = process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true'

export default function tags(data: any, key: string) {
  if (!livepreview || data === null || typeof data !== 'object') return {}

  const $ = data['$']
  const value = $ ? $[key] : {}

  return value
}
