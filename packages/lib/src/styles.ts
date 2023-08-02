export type CSSClassName = string | [string, boolean]

export default function styles(css: { readonly [key: string]: string }, ...entries: CSSClassName[]) {
  return entries.reduce<string>((result, entry) => {
    if (typeof entry === 'string') {
      return `${result} ${css[entry]}`
    }

    const name = entry[0]
    const show = entry[1]

    return show ? `${result} ${css[name]}` : result
  }, '')
}
