const db = require('../sequelize/database.js');

const addCartItem = async (productId, userId, quantity = 1) => {
    try {
        let cart = await db.Cart.findOne({
        where: { userId, status: 'active' },
        include: [{ model: db.CartItem, as: 'cartItems' }]
      });
  
      if (!cart) {
        cart = await db.cart.create({
          userId,
          status: 'active',
          total_items: 0
        });
      }
        let cartItem = await db.CartItem.findOne({
        where: { cartId: cart.id, productId }
      });
  
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
      cart.total_items += quantity;
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
        throw new Error('Không có giỏ hàng nào được tìm thấy cho người dùng này');
      }
      let cartItem = await db.CartItem.findOne({
        where: { cartId: cart.id, productId }
      });
      if (!cartItem) {
        throw new Error('Sản phẩm không tồn tại trong giỏ hàng');
      }
      if (cartItem.quantity > quantity) {
        cartItem.quantity -= quantity;
        await cartItem.save();
      } else {
        await cartItem.destroy();
      }
        cart.total_items -= quantity;
      if (cart.total_items < 0) cart.total_items = 0; 
      await cart.save();
        return cart;
    } catch (error) {
      throw new Error('Không thể xoá sản phẩm khỏi giỏ hàng');
    }
  };
  
  
module.exports = {
  addCartItem,
  removeCartItem,
}