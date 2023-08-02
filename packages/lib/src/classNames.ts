export type CSSClassName = string | [string, boolean]

export default function classNames(...entries: CSSClassName[]) {
  return entries.reduce<string>((result, entry) => {
    if (typeof entry === 'string') {
      return `${result} ${entry}`
    }

    const [name, show] = entry

    if (show) {
      return `${result} ${name}`
    }

    return result
  }, '')
}
