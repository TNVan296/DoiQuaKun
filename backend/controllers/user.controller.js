const dotenv = require('dotenv');
dotenv.config();
// const bcrypt = require('bcryptjs')
const { accessToken } = require('../utils/jwtToken.utils');
const { UserRegister, UserLogin, UserVerify } = require('../services/user.service');

const register =  async (req, res) => {
  try {
    const newUserObject = {
      email: req.body.email,
    }
    console.log(req.body)
    const newEmail = await UserRegister(newUserObject);
    // console.log(newEmail)
    // console.log(newEmail.id)
    if (newEmail && newEmail.id) {
      console.log(`New User is ${email} registered successfully !`)
      res.status(201).send({ message: 'User registered successfully !' });
    } else {
      console.log('Không tạo được hoặc người dùng đã tồn tại !!')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'User already exists' });
  }
}

const login = async (req, res) => {
  const { email } = req.body;
  // trường hợp username viết tào lao
  if (!email) {
    return res.status(400).send({ message: 'Invalid email' });
  }
  const logInEmail = await UserLogin({ email });
  if (logInEmail) {
    return res.status(200).send({ message: 'OTP sent to your email' });
  } else {
    return res.status(400).send({ message: 'User not exist !' })
  }
}

// Hàm xác thực OTP
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const emailVerify = await UserVerify({ email, otp });
  if (!emailVerify.success) {
    return res.status(400).send({ message: emailVerify.message });
  }
  return res.status(200).send({ message: emailVerify.message, token: emailVerify.data });
};

const profileUser = async (req, res) => {
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