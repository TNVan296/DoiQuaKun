// Response for adding a cart item
const cartAddResponseTemplate = (cartItem) => {
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

const cartRemoveResponseTemplate = (cartItem) => {
  return {
    data: {
      cartItem: {
        id: cartItem.id,
        cartId: cartItem.cartId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      },
      message: 'Sản phẩm đã được xóa khỏi giỏ hàng thành công',
    }
  };
};

module.exports = {
  cartAddResponseTemplate,
  cartRemoveResponseTemplate
};
