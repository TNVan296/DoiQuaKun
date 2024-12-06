const db = require('../sequelize/database.js');

const getCompletedOrders = async (userObject) => {
  try {
    const orders = await db.Order.findAll({
      where: { userId: userObject.user.id, status: 'Đã thanh toán' },
      include: [{ model: db.Cart, as: 'cart' }]
    });
    return { success: true, data: orders, message: 'Đã lấy danh sách các đơn hàng đã thanh toán !' };
  } catch (error) {
    return { success: false, message: 'Lỗi trong quá trình lấy danh sách đơn hàng!' };
  }
}

const getCompletedProductOrders = async (cartId) => {
  try {
    const orders = await db.Order.findOne({
      where: { cartId: cartId, status: 'Đã thanh toán' },
      include:
      [
        { model: db.Cart, as: 'cart', include:
          [
            { model: db.CartItem, as: 'cartItems', include:
              [
                { model: db.Product, as: 'product', include:
                  [
                    { model: db.Picture, as: 'picture' },
                    { model: db.Color, as: 'color' },
                    { model: db.Design, as: 'design' },
                    { model: db.Size, as: 'size' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });
    return { success: true, data: orders, message: 'Đã lấy danh sách các sản phẩm trong đơn hàng thành công !' };
  } catch (error) {
    return { success: false, message: 'Lỗi trong quá trình lấy danh sách đơn hàng!' };
  }
}

module.exports = {
  getCompletedOrders,
  getCompletedProductOrders
};