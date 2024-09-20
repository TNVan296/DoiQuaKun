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
    const newEmail = await UserRegister(newUserObject);
    if (newEmail.success == true) {
      return res.status(201).send({ message: newEmail.message });
    } else {
      return res.status(400).send({ message: newEmail.message });
    }
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: 'Something went wrong' });
  }
}

const login = async (req, res) => {
  const userObject = {
    email: req.body.email,
  }
  // trường hợp username viết tào lao
  if (!userObject) {
    return res.status(400).send({ message: 'Invalid email' });
  }
  const logInEmail = await UserLogin(userObject);
  if (logInEmail.success == true) {
    return res.status(200).send({ message: logInEmail.message });
  } else {
    return res.status(400).send({ message: logInEmail.message });
  }
}

// Hàm xác thực OTP
const verifyOtp = async (req, res) => {
  const userObject = {
    email: req.body.email,
    otp: req.body.otp
  }
  const emailVerify = await UserVerify(userObject);
  if (emailVerify.success == false) {
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