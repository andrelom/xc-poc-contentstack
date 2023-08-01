import Result from '@xc/lib/Result'

export type RequestOptions = {
  headers?: Record<string, string>
}

export class HTTPClient {
  async get<T = any>(url: URL, options?: RequestOptions): Promise<Result<T>> {
    return this.toResult<T>(
      await fetch(url, {
        method: 'GET',
        headers: this.headers(options),
      }),
    )
  }

  async post<T = any>(url: URL, data: any, options?: RequestOptions): Promise<Result<T>> {
    return this.toResult<T>(
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: this.headers(options),
      }),
    )
  }

  async put<T = any>(url: URL, data: any, options?: RequestOptions): Promise<Result<T>> {
    return this.toResult<T>(
      await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: this.headers(options),
      }),
    )
  }

  async delete<T = any>(url: URL, options?: RequestOptions): Promise<Result<T>> {
    return this.toResult<T>(
      await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({}),
        headers: this.headers(options),
      }),
    )
  }

  private headers(options?: RequestOptions) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (options?.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        headers[key] = value
      }
    }

    return headers
  }

  private async parse(response: Response) {
    const text = await response.text()
    const type = response.headers.get('content-type')?.toLowerCase()

    if (!text) {
      return { ok: true }
    }

    if (type !== 'application/json') {
      return { ok: true, value: text }
    }

    try {
      return { ok: true, value: JSON.parse(text) }
    } catch {
      return { ok: false, value: 'Invalid JSON Input' }
    }
  }

  private async toResult<T = any>(response: Response) {
    const parsed = await this.parse(response)

    if (response.ok && parsed.ok && Result.is(parsed.value)) {
      return Result.from<T>(parsed.value)
    }

    if (response.ok && parsed.ok) {
      return Result.success<T>(parsed.value)
    }

    let result: Result<T>

    if (Result.is(parsed.value)) {
      result = Result.from<T>(parsed.value)
    } else {
      result = Result.fail('Woops', { message: parsed.value })
    }

    if (result.metadata) {
      result.metadata.status = response.status
    } else {
      result.metadata = { status: response.status }
    }

    return result
  }
}

export function createURL(
  pathname: string,
  options?: {
    origin?: string
    search?: Record<string, any>
  },
): URL {
  let origin = options?.origin

  if (!origin) {
    if (typeof window === 'undefined') {
      origin = process.env.NEXT_BASE_URL
    } else {
      origin = process.env.NEXT_PUBLIC_BASE_URL
    }
  }

  const url = new URL(pathname, origin)
  const search = options?.search ?? {}

  for (const [key, value] of Object.entries(search)) {
    url.searchParams.append(key, value)
  }

  return url
}
