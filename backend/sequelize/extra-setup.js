const { District, City } = require("./database");

module.exports = (sequelize) => {
    const { Color, Size, Product, ProductCategory, Picture ,Cart,User,Wallet,Card,CartItem,District,City,Ward} = sequelize.models;
  
    // Một Picture có nhiều Products
    Picture.hasMany(Product, {
      foreignKey: 'pictureId',
      as: 'products'
    });
  
    Product.belongsTo(Picture, {
      foreignKey: 'pictureId',
      as: 'picture'
    });
  
    Color.hasMany(Product, {
      foreignKey: 'colorId',
      as: 'products'
    });
  
    Product.belongsTo(Color, {
      foreignKey: 'colorId',
      as: 'color'
    });
  
    Size.hasMany(Product, {
      foreignKey: 'sizeId',
      as: 'products'
    });
  
    Product.belongsTo(Size, {
      foreignKey: 'sizeId',
      as: 'size'
    });

    ProductCategory.hasMany(Product, {
      foreignKey: 'categoryId',
      as: 'products'
    });
  
    Product.belongsTo(ProductCategory, {
      foreignKey: 'categoryId',
      as: 'category'
    });

    User.hasOne(Wallet, {
      foreignKey: 'userId',
      as: 'wallet'
    });
  
    Wallet.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    User.hasMany(Cart, {
      foreignKey: 'userId',
      as: 'cart'
    });

    Cart.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Wallet.hasMany(Card, {
      foreignKey: 'walletId',
      as: 'cards'
    });

    Card.belongsTo(Wallet, {
      foreignKey: 'walletId',
      as: 'wallet'
    });
    
    Cart.hasMany(CartItem, {
      foreignKey: 'cartId',
      as: 'cartItems'
    });

    CartItem.belongsTo(Cart, {
      foreignKey: 'cartId',
      as: 'cart'
    });

   Product.hasMany(CartItem, {
      foreignKey: 'productId',
      as: 'cartItem'
    });

    CartItem.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product'
    });

    User.hasMany(District, {  
      foreignKey: 'userId',
      as: 'districts'
    });
  
    District.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    User.hasMany(City, {  
      foreignKey: 'userId',
      as: 'cities'
    });
  
    City.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    User.hasMany(Ward,{
      foreignKey: 'userId',
      as: 'wards'
    });
    Ward.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user'
    });

    City.hasMany(District, {
      foreignKey: 'cityId',
      as: 'districts'
    });
  
    District.belongsTo(City, {
      foreignKey: 'cityId',
      as: 'city'
    });

    District.hasMany(Ward, {
      foreignKey: 'districtId',
      as: 'wards'
    });

    Ward.belongsTo(District, {
      foreignKey: 'districtId',
      as: 'district'
    });

    
  };
  