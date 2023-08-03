import type { Query, LivePreviewQuery } from 'contentstack'

import { Stack, Region } from 'contentstack'
import Result from '@xc/lib/Result'
import logger from '@xc/lib/logger'

export type ContentstackOptions = {
  key: string
  token: string
  environment: string
  region: keyof typeof Region
  branch: string
  preview: {
    enable: boolean
    host: string
    token: string
  }
}

export class Contentstack {
  private options: ContentstackOptions
  private stack: Stack

  constructor(options: ContentstackOptions) {
    this.options = options
    this.stack = this.create()
  }

  setLivePreviewQuery(query: LivePreviewQuery | null | undefined) {
    if (this.options.preview.enable && query) {
      this.stack.livePreviewQuery(query)
    }
  }

  async find<T = Record<string, any>>(
    type: string,
    builder: (query: Query) => Query,
  ): Promise<Result<Contentstack.Item<T>[]>> {
    try {
      const stack = this.stack.ContentType(type).Query()
      const query = builder(stack)
      const items = await query.find()

      return Result.success(items.flat())
    } catch (error) {
      const traceId = crypto.randomUUID()

      logger.error(error, `Contentstack (Trace ID '${traceId}'): Query for type '${type}'`)

      return Result.fail('Woops', { traceId })
    }
  }

  private create() {
    return new Stack({
      api_key: this.options.key,
      delivery_token: this.options.token,
      environment: this.options.environment,
      region: Region[this.options.region],
      branch: this.options.branch,
      live_preview: {
        enable: this.options.preview.enable,
        host: this.options.preview.host,
        management_token: this.options.preview.token,
      },
    })
  }
}

export function createContentstackClient(options: ContentstackOptions) {
  return new Contentstack(options)
}
