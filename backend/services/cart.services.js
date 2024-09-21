const db = require('../sequelize/database.js');

const addCartItem = async (productId, userId, quantity = 1) => {
  try {
      // Tìm giỏ hàng của người dùng với trạng thái 'active'.
      let cart = await db.Cart.findOne({
          where: { userId, status: 'active' },
          include: [{ model: db.CartItem, as: 'cartItems' }]
      });

      // Nếu không có giỏ hàng 'active', tạo giỏ hàng mới.
      if (!cart) {
          cart = await db.Cart.create({
              userId,
              status: 'active',
              total_items: 0,
              total_prices: 0.0, 
          });
      }

      let cartItem = await db.CartItem.findOne({
          where: { cartId: cart.id, productId }
      });
      const product = await db.Product.findByPk(productId);
      const productPrice = product.exchangePoint;
      if (cartItem) {
          cartItem.quantity += quantity; 
          await cartItem.save(); 
      } else {
          await db.CartItem.create({
              cartId: cart.id,
              productId,
              quantity
          });
      }
      cart.totalItems += quantity;
      cart.totalPoints += productPrice * quantity;  
      await cart.save(); 

      return cart; 
  } catch (error) {
      throw new Error('Could not add item to cart'); 
  }
};

const removeCartItem = async (productId, userId, quantity = 1) => {
    try {
        let cart = await db.Cart.findOne({
            where: { userId, status: 'active' },
            include: [{ model: db.CartItem, as: 'cartItems' }]
        });

        if (!cart) {
            throw new Error('No active cart found for this user');
        }

        let cartItem = await db.CartItem.findOne({
            where: { cartId: cart.id, productId }
        });

        if (!cartItem) {
            throw new Error('Product not found in cart');
        }

        const product = await db.Product.findByPk(productId);
        const productPrice = product.exchangePoint;
        if (cartItem.quantity > quantity) {
            cartItem.quantity -= quantity;
            await cartItem.save();
        } else {
            await cartItem.destroy();
        }

        cart.totalItems -= quantity;
        cart.totalPoints -= productPrice * quantity;  
        if (cart.total_items < 0) cart.total_items = 0; 
        if (cart.total_prices < 0) cart.total_prices = 0.0; 

        await cart.save(); 

        return cart;
    } catch (error) {
        throw new Error('Could not remove item from cart');
    }
};

const checkoutCart = async (userId) => {
    try {
      const cart = await db.Cart.findOne({
        where: { userId, status: 'active' },
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
        where: { userId }
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
  
      return { cart, totalPointsPaid: totalPoints };
    } catch (error) {
      console.error('Checkout error:', error.message); // Log lỗi
      throw new Error('Checkout failed');
    }
  };
  


module.exports = {
    addCartItem,
    removeCartItem,
    checkoutCart,
};
