const dotenv = require('dotenv');
dotenv.config();
const {
  UserRegister,
  UserLogin,
  UserVerify,
  UserProfile,
  UserUpdateProfile,
  GetCardHistory,
  GetHistoryExchange
} = require('../services/user.service');
const { generateHTML } = require('swagger-ui-express');

// Hàm đăng ký người dùng
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
    return res.status(400).send({ message: 'Something went wrong' });
  }
}

// Hàm đăng nhập người dùng
const login = async (req, res) => {
  try {
    const userObject = {
      email: req.body.email,
    };
    if (!userObject.email) {
      return res.status(400).send({ message: 'Email không hợp lệ' });
    }
    const logInEmail = await UserLogin(userObject);
    if (logInEmail.success === true) {
      return res.status(200).send({ message: logInEmail.message });
    } else {
      return res.status(400).send({ message: logInEmail.message });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Có lỗi xảy ra trong quá trình đăng nhập.' });
  }
};

// Hàm xác thực OTP
const verifyOtp = async (req, res) => {
  try {
    const userObject = {
      email: req.body.email,
      otp: req.body.otp
    }
    const emailVerify = await UserVerify(userObject);
    if (emailVerify.success == false) {
      return res.status(400).send({ message: emailVerify.message });
    } else {
      return res.status(200).send({ token: emailVerify.data, message: emailVerify.message });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong' });
  }
};

// Hàm lấy profile người dùng
const getProfileUser = async (req, res) => {
  try {
    const userObject = {
      user: req.user,
    }
    // trường hợp middleware chưa xác thực
    if (!userObject) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const profileUser = await UserProfile(userObject);
    if (!profileUser.success) {
      return res.status(400).send({ message: profileUser.message });
    }
    return res.status(200).send({ message: profileUser.message, data: profileUser.data });
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong !' });
  }
}

// Hàm cập nhật profile người dùng
const updateProfileUser = async (req, res) => {
  try {
    const userObject = {
      user: req.body,
    }
    // trường hợp middleware chưa xác thực
    if (!userObject) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    const profileUser = await UserUpdateProfile(userObject);
    if (!profileUser.success) {
      return res.status(400).send({ message: profileUser.message });
    }
    return res.status(200).send({ message: profileUser.message, data: profileUser.data });
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong !' });
  }
}

const getCardHistory = async (req, res) => {
  try {
    const userObject = {
      user: req.user,
    }
    const cardHistory = await GetCardHistory(userObject);
    if (!cardHistory.success) {
      return res.status(400).send({ message: cardHistory.message });
    }
    return res.status(200).send({ message: cardHistory.message, data: cardHistory.data });
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong !' });
  }
}

const getHistoryExchange = async (req, res) => {
  try {
    const userObject = {
      user: req.user,
    }
    const historyExchange = await GetHistoryExchange(userObject);
    if (!historyExchange.success) {
      return res.status(400).send({ message: historyExchange.message });
    }
    return res.status(200).send({ message: historyExchange.message, data: historyExchange.data });
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong !' });
  }
}

// Export các controller
module.exports = {
  register,
  login,
  verifyOtp,
  getProfileUser,
  updateProfileUser,
  getCardHistory,
  getHistoryExchange
}
