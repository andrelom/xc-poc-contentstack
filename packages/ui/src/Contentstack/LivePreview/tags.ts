const livepreview = process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === 'true'

const isObject = (value: any) => {
  return value !== null && typeof value === 'object'
}

export default function tags(data: any, key: string) {
  if (!livepreview || !isObject(data)) return {}

  const $ = data['$']
  const value = isObject($) ? $[key] : {}

  if (!isObject(value)) return {}

  return value
}
