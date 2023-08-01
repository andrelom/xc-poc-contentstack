export type Klass = string | [string, boolean]

export default function klass(css: { readonly [key: string]: string }) {
  return (...entries: Klass[]) => {
    return entries.reduce<string>((result, entry) => {
      if (typeof entry === 'string') {
        return `${result} ${css[entry]}`
      }

      const name = entry[0]
      const show = entry[1]

      return show ? `${result} ${css[name]}` : result
    }, '')
  }
}
