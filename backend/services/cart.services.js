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

module.exports = {
    addCartItem,
    removeCartItem,
};
