import { API_BASE_URL } from '@/config/env'

export async function getRandomFragments(limit = 3) {
  const res = await fetch(`${API_BASE_URL}/api/fragments/random?limit=${limit}`)

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  return res.json()
}
