import Result from '@xc/lib/Result'

export type ResquestOptions = {
  headers?: Record<string, string>
}

export class HTTPClient {
  async get<T = any>(url: URL, options?: ResquestOptions): Promise<Result<T>> {
    return this.toResult<T>(
      await fetch(url, {
        method: 'GET',
      }),
    )
  }

  async post<T = any>(url: URL, data: any = {}, options?: ResquestOptions): Promise<Result<T>> {
    return this.toResult<T>(
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    )
  }

  async put<T = any>(url: URL, data: any, options?: ResquestOptions): Promise<Result<T>> {
    return this.toResult<T>(
      await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    )
  }

  async delete<T = any>(url: URL, options?: ResquestOptions): Promise<Result<T>> {
    return this.toResult<T>(
      await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({}),
      }),
    )
  }

  protected parse(value: string) {
    if (!value) {
      return { ok: true }
    }

    try {
      return { ok: true, value: JSON.parse(value) }
    } catch {
      return { ok: false, value: 'Invalid JSON Input' }
    }
  }

  async toResult<T = any>(response: Response): Promise<Result<T>> {
    const text = await response.text()
    const parsed = this.parse(text)

    if (response.ok && parsed.ok && Result.is(parsed.value)) {
      return Result.from<T>(parsed.value)
    }

    if (response.ok && parsed.ok) {
      return Result.success<T>(parsed.value)
    }

    let result: Result<T>

    if (Result.is(parsed.value)) {
      result = Result.from<T>(parsed.value)
    } else if (!parsed.ok) {
      result = Result.fail('Woops', { message: parsed.value })
    } else {
      result = Result.fail('Woops', { message: text })
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
