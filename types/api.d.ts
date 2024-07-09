export interface ApiResponse<T, E> {
  data?: T | null,
  error?: E,
}

export interface ApiResponseStrict<T, E> {
  data: T,
  error?: E,
}

export interface ApiError {
  code: number,
  error: string
}
