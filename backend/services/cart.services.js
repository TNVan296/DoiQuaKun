const db = require('../models/index');

const addCartItem = async (productId, userId, quantity = 1) => {
    try {
      console.log('Adding item to cart:', { productId, userId, quantity });
  
      // Tìm giỏ hàng của user
      let cart = await db.carts.findOne({
        where: { userId, status: 'active' },
        include: [{ model: db.cartItems, as: 'cartItems' }]
      });
  
      if (!cart) {
        console.log('No cart found, creating a new one.');
        cart = await db.carts.create({
          userId,
          status: 'active',
          total_items: 0
        });
      }
  
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
      let cartItem = await db.cartItems.findOne({
        where: { cartId: cart.id, productId }
      });
  
      if (cartItem) {
        console.log('Item found in cart, updating quantity.');
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        console.log('Item not found in cart, creating a new CartItem.');
        await db.CartItem.create({
          cartId: cart.id,
          productId,
          quantity
        });
      }
  
      // Cập nhật tổng số lượng sản phẩm trong giỏ hàng
      cart.total_items += quantity;
      await cart.save();
  
      console.log('Item added to cart successfully:', cart);
      return cart;
    } catch (error) {
      console.error('Error in addCartItem:', error);
      throw new Error('Could not add item to cart');
    }
  };
  
module.exports = {
  addCartItem,
};
