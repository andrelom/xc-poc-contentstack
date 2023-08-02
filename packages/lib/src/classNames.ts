export type CSSClassName = string | [string, boolean]

export default function classNames(...entries: CSSClassName[]) {
  return entries.reduce<string>((result, entry) => {
    if (typeof entry === 'string') {
      return `${result} ${entry}`
    }

    const name = entry[0]
    const show = entry[1]

    return show ? `${result} ${name}` : result
  }, '')
}
