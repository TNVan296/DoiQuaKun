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
    return response.json()
  } else {
    console.log('Error response:', response.statusText)
  }
}