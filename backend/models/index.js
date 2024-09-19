const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  pool: dbConfig.pool,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.pictures = require('./pictures.model')(sequelize, Sequelize);
db.colors = require('./colors.model')(sequelize, Sequelize);
db.sizes = require('./sizes.model')(sequelize, Sequelize);
db.products = require('./products.model')(sequelize, Sequelize);
db.productsCategories = require('./productsCategories.model')(sequelize, Sequelize);
db.cards = require('./cards.model')(sequelize, Sequelize);
db.carts = require('./carts.model')(sequelize, Sequelize);
db.wallets = require('./wallets.model')(sequelize, Sequelize);
db.users = require('./users.model')(sequelize, Sequelize);
db.cartItems = require('./cartItems.model')(sequelize, Sequelize);
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
