// model/database.js
const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pictures = require('./pictures.model.js')(sequelize, Sequelize);
db.colors = require('./colors.model.js')(sequelize, Sequelize);
db.sizes = require('./sizes.model.js')(sequelize, Sequelize);
db.products = require('./products.model.js')(sequelize, Sequelize);
db.productsCategories = require('./productsCategories.model.js')(sequelize,Sequelize);
db.cards = require('./cards.model.js')(sequelize, Sequelize);
db.carts = require('./carts.model.js')(sequelize, Sequelize);
db.wallets = require('./wallets.model.js')(sequelize, Sequelize);
db.users = require('./users.model.js')(sequelize, Sequelize);
db.cartsItems = require('./cartItems.model.js')(sequelize, Sequelize);
db.deliveries = require('./deliveries.model.js')(sequelize, Sequelize);

db.City = require('./city.model.js')(sequelize, Sequelize);
db.District = require('./district.model.js')(sequelize, Sequelize)
db.File = require('./file.model.js')(sequelize, Sequelize)

require('./extra-setup.js')(sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log('Kết nối thành công.');
  })
  .catch((err) => {
    console.error('Không thể kết nối:', err);
  });

module.exports = db;