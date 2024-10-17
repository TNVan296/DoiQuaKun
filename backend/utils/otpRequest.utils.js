const generateOTP = () => {
  const newOTP = {
    otp: Math.floor(100000 + Math.random() * 900000),
    expireIn: Date.now() + 300000
  }
  return newOTP
}

module.exports = {
  generateOTP
}