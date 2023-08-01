export default class Result<T = any> {
  constructor(ok: boolean) {
    this.ok = ok
  }

  ok: boolean
  data?: T
  error?: string
  metadata?: Record<string, any>

  static is(source: any): boolean {
    return source !== null && typeof source === 'object' && source.hasOwnProperty('ok')
  }

  static success<T>(data?: T): Result<T> {
    const result = new Result<T>(true)

    result.data = data

    return result
  }

  static fail<T>(error: string, metadata?: Record<string, any>): Result<T> {
    const result = new Result<T>(false)

    result.error = error
    result.metadata = metadata

    return result
  }

  static forward<T>(source: Result): Result<T> {
    const result = new Result<T>(source.ok)

    result.error = source.error
    result.metadata = source.metadata

    return result
  }

  static from<T>(record: Record<string, any>): Result<T> {
    const result = new Result<T>(record.ok)

    result.data = record.data
    result.error = record.error
    result.metadata = record.metadata

    return result
  }
}
