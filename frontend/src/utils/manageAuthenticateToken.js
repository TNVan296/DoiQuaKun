import { isTokenExpired } from './checkTokenExpired.js'

export async function ensureAccessToken() {
  const apiURL = import.meta.env.VITE_API_URL
  const accessToken = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')

  // nếu acccess token còn hạn
  if (accessToken && !isTokenExpired(accessToken)) {
    return accessToken
  }

  // nếu refresh token còn
  if (refreshToken && !isTokenExpired(refreshToken)) {
    const response = await fetch(`${apiURL}/users/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    })
    const dataToken = await response.json()
    const data = dataToken.data
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    return data.accessToken
  } else {
    localStorage.removeItem('hasUser')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return null
  }
}