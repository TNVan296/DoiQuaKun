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

const cartCheckoutResponseTemplate = (cart, totalPoints) => {
  return {
    data: {
      cart: {
        id: cart.id,
        userId: cart.userId,
        totalItems: cart.totalItems,
        totalPoints: cart.totalPoints,
        status: cart.status,
      },
      totalPointsPaid: totalPoints,
      message: 'Thanh toán giỏ hàng thành công',
    }
  };
};

const cartCheckoutErrorResponseTemplate = (errorMessage) => {
  return {
    error: {
      message: errorMessage,
    }
  };
};

module.exports = {
  cartAddResponseTemplate,
  cartRemoveResponseTemplate,
  cartCheckoutResponseTemplate,
  cartCheckoutErrorResponseTemplate,
};


