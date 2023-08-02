import type { ComponentType } from 'react'

import { useMemo } from 'react'

export type ModularBlock<T = any> = { data: T | null | undefined }

export default function ModularBlocks({
  entries,
  components,
}: {
  entries: Record<string, unknown>[]
  components: Record<string, ComponentType<ModularBlock>>
}) {
  return useMemo(() => {
    return Object.entries(components).reduce<JSX.Element[]>((children, [name, Component]) => {
      const entry = entries.find((entry) => entry[name])

      if (entry) {
        children.push(<Component data={entry[name]} />)
      }

      return children
    }, [])
  }, [entries, components])
}
