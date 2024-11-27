const db = require('../sequelize/database.js');

const getCartItems = async (userObject) => {
  try {
    const cart = await db.Cart.findOne({
      where: { userId: userObject.user.id, status: 'active' },
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
      return { success: true, data: cart, message: 'Cart fetched successfully' };
    }
  } catch (error) {
    return { success: false, message: 'Error while fetching cart' };
  }
}

const getExchangePoints = async (userObject) => {
  try {
    const exchangePoints = await db.Cart.findOne({
      where: { userId: userObject.user.id, status: 'active' },
      attributes: ['totalPoints']
    })
    if (!exchangePoints) {
      return 0;
    }
    return { success: true, data: exchangePoints.totalPoints, message: 'Exchange points fetched successfully' };
  } catch (error) {
    return { success: false, message: 'Error while fetching points' };
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
    return { success: true, data: userPoints.points, message: 'User Points fetched successfully' };
  } catch (error) {
    return { success: false, message: 'Error while fetching points' };
  }
}

const addCartItem = async (cartObject) => {
  try {
    if (!cartObject.cart.productId || !cartObject.cart.userId) {
      return { success: false, message: 'productId and userId are required' };
    }
    if (cartObject.cart.quantity <= 0) {
      return { success: false, message: 'Quantity must be greater than zero' };
    }
    // Tìm giỏ hàng của người dùng với trạng thái 'active'.
    let cart = await db.Cart.findOne({
      where: { userId: cartObject.cart.userId, status: 'active' },
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
        status: 'active',
        total_items: 0,
        total_prices: 0.0, 
      });
    }
    console.log('vao day')
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
    return { success: true, data: cart, message: 'Add item to cart successfully !' };
  } catch (error) {
    throw new Error('Could not add item to cart'); 
  }
};

const removeCartItem = async (cartObject) => {
  try {
    if (!cartObject.cart.productId || !cartObject.cart.userId) {
      return res.status(400).json({ message: 'productId and userId are required' });
    }
    if (cartObject.cart.quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }
    let cart = await db.Cart.findOne({
      where: { userId: cartObject.cart.userId, status: 'active' },
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
      throw new Error('No active cart found for this user');
    }
    let cartItem = await db.CartItem.findOne({
      where: { cartId: cart.id, productId: cartObject.cart.productId}
    });
    if (!cartItem) {
      throw new Error('Product not found in cart');
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
    return { success: true, data: cart, message: 'Remove item from cart successfully !' };
  } catch (error) {
    throw new Error('Could not remove item from cart');
  }
};

const checkoutCart = async (cartObject) => {
  try {
    if (!cartObject.cart.userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    const cart = await db.Cart.findOne({
      where: { userId: cartObject.cart.userId, status: 'active' },
      include: [{ model: db.CartItem, as: 'cartItems' }]
    });
    if (!cart) {
      throw new Error('No active cart found');
    }
    const totalPoints = cart.totalPoints;  
    if (totalPoints === undefined) {
      throw new Error('Total points not found in cart'); // Thêm kiểm tra cho totalPoints
    }
    const wallet = await db.Wallet.findOne({
      where: { userId: cartObject.cart.userId },
    });
    if (!wallet) {
      throw new Error('Wallet not found for this user');
    }
    if (wallet.points < totalPoints) {
      throw new Error('Insufficient points in wallet');
    }
    wallet.points -= totalPoints;
    await wallet.save();
    cart.status = 'complete';
    await cart.save();
    return { success: true, data: cart, totalPointsPaid: totalPoints, message: 'Checkout successful !' };
  } catch (error) {
    throw new Error('Checkout failed');
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
