export const nextInput = (e, index, setOtpInputValues) => {
  const input = e.target
  const inputValue = input.value
  const currentId = parseInt(input.id.split('-')[1])

  if (inputValue) {
    setOtpInputValues((prev) => {
      const newInputValues = [...prev]
      newInputValues[index] = inputValue
      return newInputValues
    })
    const nextInput = document.getElementById(`otp-${currentId + 1}`)
    if (nextInput) {
      nextInput.focus()
    }
  } else {
    setOtpInputValues((prev) => {
      const newInputValues = [...prev]
      newInputValues[index] = inputValue
      return newInputValues
    })
    const prevInput = document.getElementById(`otp-${currentId - 1}`)
    if (prevInput) {
      prevInput.focus()
    }
  }
}