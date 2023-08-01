import { Stack, Region, Query } from 'contentstack'
import logger from '@xc/lib/logger'

export interface Options {
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
  private options: Options
  private stack: Stack

  constructor(options: Options) {
    this.options = options
    this.stack = this.create()
  }

  raw() {
    return this.stack
  }

  async find<T = Record<string, any>>(
    type: string,
    builder: (query: Query) => Query,
  ): Promise<Core.Result<Contentstack.Item<T>[]>> {
    try {
      const stack = this.stack.ContentType(type).Query()
      const query = builder(stack)
      const items = await query.find()

      return { ok: true, data: items.flat() }
    } catch (error) {
      const traceId = crypto.randomUUID()

      logger.error(error, `Contentstack: Trace ID '${traceId}'`)

      return { ok: false, error: 'Unexpected Error', metadata: { traceId } }
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

export function createContentstackClient(options: Options) {
  return new Contentstack(options)
}
