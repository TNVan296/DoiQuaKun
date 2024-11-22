import { ensureAccessToken } from './manageAuthenticateToken.js'

export async function fetchWithAuthToken(url, options = {}) {
  const tokens = await ensureAccessToken()

  if (!tokens) {
    alert('Session expired. Please log in again !')
    window.location.href = '/home'
  }
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${tokens}`
  }
  const response = await fetch(url, options)
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    console.log('Error response:', response.statusText)
  }
}