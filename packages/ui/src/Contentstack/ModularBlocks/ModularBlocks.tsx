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
    return entries.reduce<JSX.Element[]>((children, entry) => {
      for (const [name, Component] of Object.entries(components)) {
        const data = entry[name]

        if (data) {
          return [...children, <Component key={crypto.randomUUID()} data={data} />]
        }
      }

      return children
    }, [])
  }, [entries, components])
}
