const db = require('../sequelize/database');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Thư viện để tạo UUID cho guest ID

const addCartItem = async (cardName, userId = null, guestId = null) => {
    try {
        let cart;
        
        if (userId) {
            // Nếu người dùng đã đăng nhập, tìm giỏ hàng dựa trên userId
            cart = await db.carts.findOne({ where: { userId } });
            
            if (!cart) {
                // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng cho người dùng
                cart = await db.carts.create({ userId });
            }
        } else {
            // Nếu người dùng chưa đăng nhập, sử dụng guestId
            if (!guestId) {
                // Nếu chưa có guestId, tạo mới một UUID cho khách hàng
                guestId = uuidv4();
            }

            // Tìm giỏ hàng dựa trên guestId
            cart = await db.carts.findOne({ where: { guestId } });

            if (!cart) {
                // Nếu giỏ hàng chưa tồn tại, tạo mới giỏ hàng cho khách hàng
                cart = await db.carts.create({ guestId });
            }
        }

        // Tìm sản phẩm dựa trên tên sản phẩm (cardName)
        const product = await db.products.findOne({ where: { name: cardName } });

        if (!product) {
            throw new Error('Sản phẩm không tồn tại.');
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        let cartItem = await db.cartsItems.findOne({
            where: {
                cartId: cart.id,
                productId: product.id,
            },
        });

        if (cartItem) {
            // Nếu đã tồn tại, cập nhật số lượng
            cartItem.quantity += 1; // Hoặc cập nhật theo logic cụ thể
            await cartItem.save();
        } else {
            // Nếu chưa tồn tại, thêm mục mới
            cartItem = await db.cartsItems.create({
                cartId: cart.id,
                productId: product.id,
                quantity: 1, // Số lượng mặc định khi thêm mới
            });
        }

        console.log('Đã thêm sản phẩm vào giỏ hàng.');
        return { cartItem, guestId }; // Trả về thông tin sản phẩm và guestId
    } catch (error) {
        console.error('Lỗi khi thực hiện truy vấn:', error);
        throw error;
    }
};

module.exports = {
    addCartItem,
};
