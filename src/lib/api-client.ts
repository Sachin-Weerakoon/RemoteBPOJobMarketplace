'use client'

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`/bridge/v1${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })
  const payload = await response.json()
  if (!response.ok) throw new Error(payload.error || 'The request could not be completed.')
  return payload as T
}
