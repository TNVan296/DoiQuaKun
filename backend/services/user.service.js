const db = require('../sequelize/database.js');
const { sendOtpToEmail } = require('../utils/emailHelper.utils');
const { createAccessToken, createRefreshToken } = require('../utils/jwtToken.utils');

const UserRegister = async (newUserObject) => {
  try {
    const existsUser = await db.User.findOne({ where: { email: newUserObject.email } });

    if (existsUser) {
      return { success: false, message: 'User already exists' };
    }
    const newUser = await db.User.create({
      email: newUserObject.email,
      createdAt: new Date(),
      updateAt: new Date()
    });
    // khi tạo 1 user mới liền lập tức tạo cho họ 1 ví người dùng, 1 giỏ hàng và 1 đơn hàng
    await db.Wallet.create({
      userId: newUser.id,
      points: 0,
      status: 'active',
      createAt: new Date(),
      updateAt: new Date()
    });
    // tạo mới 1 giỏ hàng
    await db.Cart.create({
      userId: newUser.id,
      totalItems: 0,
      totalPoints: 0,
      status: 'Đã kích hoạt'
    });
    // tạo mới 1 đơn hàng
    await db.Order.create({
      userId: newUser.id,
      cartId: userCart.id,
      status: 'Chưa thanh toán',
    });
    return { success: true, data: newUser, message: `New User is ${newUser.email} registered successfully!` };
  } catch (error) {
    console.error('Error while registering user:', error);
    return null;
  }
};

const UserLogin = async (userObject) => {
  try {
    const user = await db.User.findOne({ where: { email: userObject.email } });
    
    if (!user) {
      await UserRegister(userObject);
      return await UserLogin(userObject);
    }

    if (user.otp) {
      return { success: true, message: 'Người dùng đã tồn tại OTP, vui lòng đăng nhập !' };
    } else {
      const newOtp = await user.set({
        otp: Math.floor(100000 + Math.random() * 900000)
      });
      await newOtp.save();
      const mailSend = sendOtpToEmail(user.email, newOtp.otp);
      if (!mailSend) {
        return { success: false, message: 'Lỗi khi gửi Email !' };
      }
      return { success: true, message: 'Mã OTP mới đã được gửi đến Email của bạn !' };
    }
  } catch (error) {
    return { success: false, message: 'Error while logging in user' };
  }
};

const UserVerify = async (userObject) => {
  try {
    const user = await db.User.findOne({ where: { email: userObject.email } });
    if (!user) {
      return { success: false, message: 'User does not exist' };
    }
    
    if (!user.otp) {
      return { success: false, message: 'OTP not found, please request again' };
    }
    
    if (user.otp !== parseInt(userObject.otp)) {
      return { success: false, message: 'Invalid OTP' };
    }
    
    const accessToken = createAccessToken(userObject, process.env.AT_SECRET);
    const refreshToken = createRefreshToken(userObject, process.env.RT_SECRET);
    await user.update({ refreshToken: refreshToken, rtExpireIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
    return {
      success: true,
      data: { accessToken, refreshToken },
      message: 'OTP verified, login successful'
    };
  } catch (error) {
    return { success: false, message: 'Error while verifying user' };
  }
};

const UserGetNewOtp = async (userObject) => {
  try {
    const user = await db.User.findOne({ where: { email: userObject.email } });
    if (!user) {
      return { success: false, message: 'Người dùng không tồn tại !' };
    }
    const newOtp = await user.set({
      otp: Math.floor(100000 + Math.random() * 900000)
    });
    await newOtp.save();
    const mailSend = sendOtpToEmail(user.email, newOtp.otp);
    if (!mailSend) {
      return { success: false, message: 'Lỗi khi gửi Email !' };
    }
    return { success: true, message: 'Mã OTP mới đã được gửi đến Email của bạn !' };
  } catch (error) {
    return { success: false, message: 'Lỗi đăng nhập' };
  }
};

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
};

const UserUpdateProfile = async (userObject) => {
  try {
    const user = await db.User.findOne({ where: { email: userObject.user.email } });
    if (!user) {
      return { success: false, message: 'User does not exist' };
    }
    const updatedUser = await user.update({
      name: userObject.user.name,
      phoneNumber: userObject.user.phoneNumber,
      gender: userObject.user.gender,
      detailAddress: userObject.user.detailAddress,
      cityId: userObject.user.cityId,
      districtId: userObject.user.districtId,
      wardId: userObject.user.wardId,
      updateAt: new Date(),
    });
    return { success: true, data: updatedUser, message: 'User profile updated successfully' };
  } catch (error) {
    return { success: false, message: 'Error while updating user profile' };
  }
};

const GetCardHistory = async (userObject) => {
  try {
    const user = await db.User.findOne({ where: { email: userObject.user.email } });
    if (!user) {
      return { success: false, message: 'User does not exist' };
    }
    const walletUser = await db.Wallet.findOne({ where: { userId: user.id } });
    if (!walletUser) {
      return { success: false, message: 'Wallet does not exist' };
    }
    const cardHistory = await db.Card.findAll({ where: { walletId: walletUser.id, status: 'Đã nạp' } });
    return { success: true, data: cardHistory, message: 'User card history fetched successfully' };
  } catch (error) {
    return { success: false, message: 'Error while fetching user card history' };
  }
};

const GetHistoryExchange = async (userObject) => {
  try {
    const user = await db.User.findOne({ where: { email: userObject.user.email } });
    if (!user) {
      return { success: false, message: 'User does not exist' };
    }
    const cartHistoryExchange = await db.Cart.findAll({
      where : { userId: user.id, status: 'Đã thanh toán' },
      include: [
        {
          model: db.CartItem,
          as: 'cartItems',
          include: [{ model: db.Product, as: 'product' }],
        },
      ]
    });
    return { success: true, data: cartHistoryExchange, message: 'User history exchange fetched successfully' };
  } catch (error) {
    return { success: false, message: 'Error while fetching user history exchange' };
  }
};

module.exports = {
  UserRegister,
  UserLogin,
  UserVerify,
  UserGetNewOtp,
  UserProfile,
  UserUpdateProfile,
  GetCardHistory,
  GetHistoryExchange
};
