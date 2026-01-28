export type ApiResponse<T> = {
  data: T
  success: boolean
  message: string
}

export function generateSuccessResponse<T>(
  data: T,
  message: string = 'Operation successful',
): ApiResponse<T> {
  return {
    data,
    message,
    success: true,
  }
}

export function generateErrorResponse(
  message: string = 'Operation failed',
): ApiResponse<null> {
  return {
    data: null,
    message,
    success: false,
  }
}
