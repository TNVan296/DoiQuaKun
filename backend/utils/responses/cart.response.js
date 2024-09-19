// utils/responses/cart.response.js
const cartResponseTemplate = (cartItem) => {
    return {
      data: {
        cartItem: {
          id: cartItem.id,
          cartId: cartItem.cartId,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
        },
        message: 'Sản phẩm đã được thêm vào giỏ hàng thành công',
      }
    };
  };
  
  module.exports = cartResponseTemplate;
  