const dotenv = require('dotenv');
dotenv.config();
// const bcrypt = require('bcryptjs')
const { sendOtpToEmail } = require('../utils/emailHelper.utils')
const { accessToken } = require('../utils/jwtToken.utils')

const users = []
const otpStore = {};

const register =  async (req, res) => {
  const { username } = req.body;

  // trường hợp user đã tồn tại hay chưa
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  // thêm user
  users.push({ username })
  res.status(201).send({ message: 'User registered successfully !' })
}

const login = async (req, res) => {
  const { username } = req.body;
  
  // trường hợp username viết tào lao
  if (!username) {
    return res.status(400).send({ message: 'Invalid username' });
  }

  // trường hợp user đã tồn tại hay chưa
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    // Tạo OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Luu OTP (5p hết (milisec))
    otpStore[username] = { otp, expires: Date.now() + 300000 };

    // Gửi OTP qua email
    const mailSent = sendOtpToEmail(userExists.username, otp);

    return res.status(200).send({ message: 'OTP sent to your email' });
  } else {
    return res.status(400).send({ message: 'User not exist !' })
  }
}

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

  // Xác thực thành công, tiến hành tạo session hoặc token
  const token = accessToken(email, process.env.JWT_SECRET);
  res.status(200).json({ accessToken: token , message: 'OTP verified, login successful'});
};

const profileUser = (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  res.json({ user: req.user });
}

module.exports = {
  verifyOtp,
  register,
  login,
  profileUser
}