const dotenv = require('dotenv');
dotenv.config();
const {
  UserRegister,
  UserLogin,
  UserVerify,
  UserProfile,
  UserUpdateProfile,
  // UserRequestOtp
} = require('../services/user.service');
const { generateHTML } = require('swagger-ui-express');

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

const login = async (req, res) => {
  try {
    const userObject = {
      email: req.body.email,
    }
    // trường hợp email viết tào lao
    if (!userObject) {
      return res.status(400).send({ message: 'Invalid email' });
    }
    const logInEmail = await UserLogin(userObject);
    if (logInEmail.success == true) {
      return res.status(200).send({ message: logInEmail.message });
    } else {
      return res.status(400).send({ message: logInEmail.message });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong' });
  }
}

// hàm tạo và gửi OTP
// const getOtp = async (req, res) => {
//   try {
//     const userObject = {
//       email: req.body.email
//     }
//     const newOTP = UserRequestOtp(userObject)
//     return res.status(200).send({ message: newOTP.message, data: newOTP.data });
//   } catch (error) {
//     return res.status(400).send({ message: 'Something went wrong' });
//   }
// }

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

module.exports = {
  verifyOtp,
  register,
  login,
  // getOtp,
  getProfileUser,
  updateProfileUser
}