const dotenv = require('dotenv');
dotenv.config();
const db = require('../sequelize/database.js');
const { Sequelize } = require('sequelize');
const { sendOtpToEmail } = require('../utils/emailHelper.utils')
const { accessToken } = require('../utils/jwtToken.utils');

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
    return { success: true, data: newUser, message: `New User is ${newUser.email} registered successfully !` };
  } catch (error) {
    console.error('Error while registering user:', error);
    return null;
  }
}

const UserLogin = async (userObject) => {
  try {
  // trường hợp user đã tồn tại hay chưa
    const user = await db.User.findOne({ where: { email: userObject.email } });
    if (!user) {
      await UserRegister(userObject);
      return await UserLogin(userObject);
    }
    // Tạo OTP và lưu OTP (sau 5p sẽ hết hạn)
    const newOtp = await user.set({
      otp: Math.floor(100000 + Math.random() * 900000),
      expireIn: Date.now() + 300000,
    })
    await newOtp.save();
    // Gửi OTP qua email
    const mailSend = sendOtpToEmail(user.email, newOtp.otp);
    return { success: true, data: user, message: 'OTP sent to your email' };
  } catch (error) {
    return { success: false, message: 'Error while logging in user' };
  }
}

const UserVerify = async (userObject) => {
  try {
    if (!userObject.email || !userObject.otp) {
      return { success: false, message: 'Email and OTP are required' };
    }
    // trường hợp user đã tồn tại hay chưa, OTP của người dùng này còn hạn sử dụng hay không
    const user = await db.User.findOne({
      where: {
        email: userObject.email,
        otp: userObject.otp,
        expireIn: { [Sequelize.Op.gt]: Date.now() },
      }
    });
    if (!user) {
      return { success: false, message: 'User does not exist' };
    } else {
      // Kiểm tra xem OTP có tồn tại và còn hợp lệ không
      if (!user.otp) {
        return { success: false, message: 'OTP not found, please request again' };
      }
      if (user.expireIn < Date.now()) {
        return { success: false, message: 'OTP has expired, please request a new one' };
      }
      if (user.otp !== parseInt(userObject.otp)) {
        return { success: false, message: 'Invalid OTP' };
      }
      // Xác thực được đăng ký
      const token = accessToken(userObject, process.env.JWT_SECRET);
      return { success: true, data: token, message: 'OTP verified, login successful' };
    }
  } catch (error) {
    console.log(error)
    return { success: false, message: 'Error while verifying user' };
  }
}

const UserProfile = async (userObject) => {
  try {
    const user = await db.User.findOne({ where: { email: userObject.user.email } });
    if (!user) {
      return { success: false, message: 'User does not exist' };
    }
    return { success: true, data: user, message: 'User profile fetched successfully' };
  } catch (error) {
    return { success: false, message: 'Error while fetching user profile' };
  }
}

module.exports = {
   UserRegister,
   UserLogin,
   UserVerify,
   UserProfile
};
