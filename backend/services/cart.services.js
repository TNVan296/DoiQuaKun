const db = require('../sequelize/database.js');

const getCartItems = async (userObject) => {
  try {
    const cart = await db.Cart.findOne({
      where: { userId: userObject.user.id, status: 'Đã kích hoạt' },
      include:
      [
        { model: db.CartItem, as: 'cartItems', include:
          [
            { model: db.Product, as: 'product', include:
              [
                { model: db.Picture, as: 'picture' },
                { model: db.Color, as: 'color' }
              ]
            }
          ] 
        }
      ]
    })
    if (!cart) {
      return { success: false, message: 'Cart not found' };
    } else {
      return { success: true, data: cart, message: 'Đã lấy giỏ hàng của người dùng thành công !' };
    }
  } catch (error) {
    return { success: false, message: 'Lỗi không thể lấy được sản phẩm trong giỏ hàng !' };
  }
}

const getExchangePoints = async (userObject) => {
  try {
    const exchangePoints = await db.Cart.findOne({
      where: { userId: userObject.user.id, status: 'Đã kích hoạt' },
      attributes: ['totalPoints']
    })
    if (!exchangePoints) {
      return 0;
    }
    return { success: true, data: exchangePoints.totalPoints, message: 'Đã lấy điểm cần đổi thành công !' };
  } catch (error) {
    return { success: false, message: 'Lỗi không thể lấy được điểm cần đổi !' };
  }
}

const getUserPoints = async (userObject) => {
  try {
    const userPoints = await db.Wallet.findOne({
      where: { userId: userObject.user.id },
      attributes: ['points']
    })
    if (!userPoints) {
      return 0;
    }
    return { success: true, data: userPoints.points, message: 'Đã lấy điểm của người dùng thành công !' };
  } catch (error) {
    return { success: false, message: 'Lỗi không thể lấy được điểm của người dùng !' };
  }
}

const addCartItem = async (cartObject) => {
  try {
    if (!cartObject.cart.productId || !cartObject.cart.userId) {
      return res.status(400).json({ message: 'Yêu cầu ID sản phẩm và ID của người dùng !' });
    }
    if (cartObject.cart.quantity <= 0) {
      return res.status(400).json({ message: 'Số lượng phải lớn hơn 0 !' });
    }
    // Tìm giỏ hàng của người dùng với trạng thái 'active'.
    let cart = await db.Cart.findOne({
      where: { userId: cartObject.cart.userId, status: 'Đã kích hoạt' },
      include: [{ model: db.CartItem, as: 'cartItems', include:
        [
          { model: db.Product, as: 'product', include:
            [
              { model: db.Picture, as: 'picture' },
              { model: db.Color, as: 'color' },
              { model: db.Size, as: 'size' },
              { model: db.Design, as: 'design' }
            ]
          }
        ]
      }]
    });
    // Nếu không có giỏ hàng 'active', tạo giỏ hàng mới.
    if (!cart) {
      cart = await db.Cart.create({
        userId: cartObject.cart.userId,
        status: 'Đã kích hoạt',
        total_items: 0,
        total_prices: 0.0, 
      });
    }
    let cartItem = await db.CartItem.findOne({
      where: { cartId: cart.id, productId: cartObject.cart.productId }
    });
    const product = await db.Product.findByPk(cartObject.cart.productId);
    const productPrice = product.exchangePoint;
    if (cartItem) {
      cartItem.quantity += cartObject.cart.quantity; 
      await cartItem.save(); 
    } else {
      await db.CartItem.create({
        cartId: cart.id,
        productId: cartObject.cart.productId,
        quantity: cartObject.cart.quantity
      });
    }
    cart.totalItems += cartObject.cart.quantity;
    cart.totalPoints += productPrice * cartObject.cart.quantity;  
    await cart.save(); 
    return { success: true, data: cart, message: 'Thêm sản phẩm vào giỏ hàng thành công !' };
  } catch (error) {
    throw new Error('Không thể thêm sản phẩm vào giỏ hàng !'); 
  }
};

const removeCartItem = async (cartObject) => {
  try {
    if (!cartObject.cart.productId || !cartObject.cart.userId) {
      return res.status(400).json({ message: 'Yêu cầu ID sản phẩm và ID của người dùng !' });
    }
    if (cartObject.cart.quantity <= 0) {
      return res.status(400).json({ message: 'Số lượng phải lớn hơn 0 !' });
    }
    let cart = await db.Cart.findOne({
      where: { userId: cartObject.cart.userId, status: 'Đã kích hoạt' },
      include: [{ model: db.CartItem, as: 'cartItems', include:
        [
          { model: db.Product, as: 'product', include:
            [
              { model: db.Picture, as: 'picture' },
              { model: db.Color, as: 'color' },
              { model: db.Size, as: 'size' },
              { model: db.Design, as: 'design' }
            ]
          }
        ]
      }]
    });
    if (!cart) {
      throw new Error('Giỏ hàng của người dùng chưa được kích hoạt !');
    }
    let cartItem = await db.CartItem.findOne({
      where: { cartId: cart.id, productId: cartObject.cart.productId}
    });
    if (!cartItem) {
      throw new Error('Không tìm thấy sản phẩm trong giỏ hàng !');
    }
    const product = await db.Product.findByPk(cartObject.cart.productId);
    const productPrice = product.exchangePoint;
    if (cartItem.quantity > cartObject.cart.quantity) {
      cartItem.quantity -= cartObject.cart.quantity;
      await cartItem.save();
    } else {
      await cartItem.destroy();
    }

    cart.totalItems -= cartObject.cart.quantity;
    cart.totalPoints -= productPrice * cartObject.cart.quantity;  
    if (cart.total_items < 0) cart.total_items = 0; 
    if (cart.total_prices < 0) cart.total_prices = 0.0; 

    await cart.save();
    return { success: true, data: cart, message: 'Xóa sản phẩm trong giỏ hàng thành công !' };
  } catch (error) {
    throw new Error('Không thể xóa sản phẩm trong giỏ hàng !');
  }
};

const checkoutCart = async (cartObject) => {
  try {
    if (!cartObject.cart.userId) {
      return res.status(400).json({ message: 'Yêu cầu phải có ID của người dùng' });
    }
    const cart = await db.Cart.findOne({
      where: { userId: cartObject.cart.userId, status: 'Đã kích hoạt' },
      include: [{ model: db.CartItem, as: 'cartItems' }]
    });
    if (!cart) {
      throw new Error('Giỏ hàng chưa được kích hoạt !');
    }
    const totalPoints = cart.totalPoints;  
    if (totalPoints === undefined) {
      throw new Error('Tổng điểm của người dùng không tìm thấy !'); // Thêm kiểm tra cho totalPoints
    }
    const wallet = await db.Wallet.findOne({
      where: { userId: cartObject.cart.userId },
    });
    if (!wallet) {
      throw new Error('Không tìm thấy ví của người dùng !');
    }
    if (wallet.points < totalPoints) {
      throw new Error('Không đủ điểm để đổi !');
    }
    wallet.points -= totalPoints;
    await wallet.save();
    cart.status = 'Đã thanh toán';
    await cart.save();

    // người dùng thanh toán xong liền tạo 1 giỏ hàng mới
    await db.Cart.create({
      userId: cartObject.cart.userId,
      totalItems: 0,
      totalPoints: 0,
      status: 'Đã kích hoạt'
    });
    return { success: true, data: cart, totalPointsPaid: totalPoints, message: 'Thanh toán thành công !' };
  } catch (error) {
    throw new Error('Thanh toán thất bại !');
  }
};

module.exports = {
  getCartItems,
  getExchangePoints,
  getUserPoints,
  addCartItem,
  removeCartItem,
  checkoutCart,
};
