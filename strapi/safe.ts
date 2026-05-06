import { AxiosError } from "axios"

const formatStatus = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.status ?? "NO_RESPONSE"
  }
  return "UNKNOWN"
}

export async function withStrapiFallback<T>(operation: string, fallback: T, request: () => Promise<T>): Promise<T> {
  try {
    return await request()
  } catch (error) {
    const status = formatStatus(error)
    console.error(`[STRAPI] ${operation} failed with status ${status}. Using fallback value.`)
    return fallback
  }
}
