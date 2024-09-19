// model/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MLteachProject', 'root', 'Hung199535hcm@', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.pictures = require('./pictures.model')(sequelize, Sequelize);
db.colors = require('./colors.model')(sequelize, Sequelize);
db.sizes = require('./sizes.model')(sequelize, Sequelize);
db.products = require('./products.model')(sequelize, Sequelize);
db.productsCategories = require('./productsCategories.model')(sequelize,Sequelize);
db.cards = require('./cards.model')(sequelize, Sequelize);
db.carts = require('./carts.model')(sequelize, Sequelize);
db.wallets = require('./wallets.model')(sequelize, Sequelize);
db.users = require('./users.model')(sequelize, Sequelize);
db.cartsItems = require('./cartItems.model')(sequelize, Sequelize);
require('./extra-setup')(sequelize);



sequelize
  .authenticate()
  .then(() => {
    console.log('Kết nối thành công.');
  })
  .catch((err) => {
    console.error('Không thể kết nối:', err);
  });

module.exports = db;
