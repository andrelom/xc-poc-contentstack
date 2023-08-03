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
    const available = Object.entries(components)

    return entries.reduce<JSX.Element[]>((children, entry) => {
      for (const [name, Component] of available) {
        const data = entry[name]

        if (data) {
          return [...children, <Component key={crypto.randomUUID()} data={data} />]
        }
      }

      return children
    }, [])
  }, [entries, components])
}
