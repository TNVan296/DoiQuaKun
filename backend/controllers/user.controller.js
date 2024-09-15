const nodemailer = require('nodemailer');
const { sendEmail } = require('../utils/emailHelper');

// Lưu OTP tạm thời (hoặc sử dụng Redis, DB)
const otpStore = {};

const generateOTP = () => {
  // Tạo mã OTP 6 chữ số
  return Math.floor(100000 + Math.random() * 900000);
};

// Hàm gửi OTP
const sendOtpToEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).send('Invalid email format');
  }

  // Tạo OTP
  const otp = generateOTP();

  // Luu OTP (5p hết (milisec))
  otpStore[email] = {otp, expires: Date.now() + 300000};

  // Gửi OTP qua email
  try {
    await sendEmail(email, otp);
    res.status(200).send('OTP sent to email');
  } catch (error) {
    // console.error(error);
    res.status(500).send('Failed to send OTP');
  }
};

// Hàm xác thực OTP
const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send('Email and OTP are required');
  }

  const storedOtpData = otpStore[email];

  // Kiểm tra xem OTP có tồn tại và còn hợp lệ không
  if (!storedOtpData) {
    return res.status(400).send('OTP not found, please request again');
  }

  const { otp: storedOtp, expiresIn } = storedOtpData;

  if (Date.now() > expiresIn) {
    return res.status(400).send('OTP has expired, please request a new one');
  }

  if (storedOtp !== parseInt(otp)) {
    return res.status(400).send('Invalid OTP');
  }

  // Xác thực thành công, có thể tiến hành tạo session hoặc token
  res.status(200).send('OTP verified, login successful');
};

module.exports = {
  sendOtpToEmail,
  verifyOtp
};