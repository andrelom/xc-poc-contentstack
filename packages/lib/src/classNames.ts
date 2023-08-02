export type CSSClassName = string | [string, boolean]

export default function classNames(...entries: CSSClassName[]) {
  return entries.reduce<string>((result, entry) => {
    if (typeof entry === 'string') {
      return entry ? `${result} ${entry}` : result
    }

    const [name, show] = entry

    return show ? `${result} ${name}` : result
  }, '')
}
