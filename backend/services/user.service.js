const dotenv = require('dotenv');
dotenv.config();
const db = require('../sequelize/database.js');
const { Sequelize } = require('sequelize');
const { sendOtpToEmail } = require('../utils/emailHelper.utils')
const { accessToken } = require('../utils/jwtToken.utils');

const otpStore = {};

const UserRegister = async (newUserObject) => {
  try {
    // trường hợp user đã tồn tại hay chưa
    const existsUser = await db.User.findOne({ where: { email: newUserObject.email } })

    if (existsUser) {
      return { success: false, message: 'User already exists' };
    }
    const newUser = await db.User.create({
      email: newUserObject.email,
      createdAt: new Date(),
    });
    // console.log(`New User is ${newUser.email} registered successfully !`);
    return { success: true, data: newUser };
  } catch (error) {
    console.error('Error while registering user:', error);
    return null;
  }
}

const UserLogin = async (email) => {
  try {
  // trường hợp user đã tồn tại hay chưa
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    // Tạo OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    // Luu OTP (5p hết (milisec))
    otpStore[user] = { otp, expires: Date.now() + 300000 };
    // Gửi OTP qua email
    const mailSend = sendOtpToEmail(user.email, otp);
    return { success: true, data: user };
  } catch (error) {
    // console.error('Error while logging in user:', error);
    return { success: false, message: 'Error while logging in user' };
  }
}

const UserVerify = async (email, otp) => {
  try {
    if (!email || !otp) {
      return { success: false, message: 'Email and OTP are required' };
    }
    const storedOtpData = otpStore[email];

    // Kiểm tra xem OTP có tồn tại và còn hợp lệ không
    if (!storedOtpData) {
      return { success: false, message: 'OTP not found, please request again' };
    }

    const { otp: storedOtp, expires } = storedOtpData;
    if (Date.now() > expires) {
      return { success: false, message: 'OTP has expired, please request a new one' };
    }
    if (storedOtpData.otp !== parseInt(otp)) {
      return { success: false, message: 'Invalid OTP' };
    }
    // Xác thực được đăng ký
    const token = accessToken(email, process.env.JWT_SECRET);
    return { success: true, data: token };
  } catch (error) {
    // console.error('Error while verifying user:', error);
    return { success: false, message: 'Error while verifying user' };
  }
}

module.exports = {
   UserRegister,
   UserLogin,
   UserVerify
};
