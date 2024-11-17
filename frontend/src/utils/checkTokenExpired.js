import { jwtDecode } from 'jwt-decode'

export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token)
    const currentTime = Date.now() / 1000 // Thời gian hiện tại (giây)
    return decoded.exp < currentTime // Hết hạn nếu `exp` nhỏ hơn thời gian hiện tại
  } catch (error) {
    console.error('Invalid token:', error)
    return true
  }
}