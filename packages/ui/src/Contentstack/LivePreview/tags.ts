export default function tags(data: any, key: string) {
  if (data === null || typeof data !== 'object') return {}

  const $ = data['$']
  const value = $ ? $[key] : {}

  return value
}
