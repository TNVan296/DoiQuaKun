export const nextInput = (event) => {
  const input = event.target
  const value = input.value
  const currentId = parseInt(input.id.split('-')[1]) // Lấy số thứ tự từ id

  if (value.length) {
    const nextInput = document.getElementById(`otp-${currentId + 1}`)
    if (nextInput) {
      nextInput.focus()
    }
  }
  else {
    const prevInput = document.getElementById(`otp-${currentId - 1}`)
    if (prevInput) {
      prevInput.focus()
    }
  }
}