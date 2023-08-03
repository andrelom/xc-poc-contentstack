import type { Query, LivePreviewQuery } from 'contentstack'

import { Stack, Region } from 'contentstack'
import { addEditableTags } from '@contentstack/utils'
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

  async find<T = Record<string, any>>(
    type: string,
    preview: LivePreviewQuery | null | undefined,
    builder: (query: Query) => Query,
  ): Promise<Result<Contentstack.Item<T>[]>> {
    try {
      this.setLivePreviewQuery(preview)

      const stack = this.stack.ContentType(type).Query()
      const query = builder(stack)
      const items = await query.find()

      if (this.options.preview.enable) {
        addEditableTags(items[0][0], type, true)
      }

      return Result.success(items.flat())
    } catch (error) {
      const traceId = crypto.randomUUID()

      logger.error(error, `Contentstack (Trace ID '${traceId}'): Query for type '${type}'`)

      return Result.fail('Woops', { traceId })
    }
  }

  private setLivePreviewQuery(preview: LivePreviewQuery | null | undefined) {
    if (!this.options.preview.enable) return
    if (!preview?.live_preview || !preview?.content_type_uid) return

    this.stack.livePreviewQuery(preview)
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
