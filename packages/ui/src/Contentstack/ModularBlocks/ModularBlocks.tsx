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
    const list = Object.entries(components)

    return entries.reduce<JSX.Element[]>((children, entry) => {
      for (const [name, Component] of list) {
        const data = entry[name]

        if (data) {
          children.push(<Component data={data} />)
        }
      }

      return children
    }, [])
  }, [entries, components])
}
