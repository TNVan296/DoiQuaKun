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

db.pictures = require('./models/pictures.model.js')(sequelize, Sequelize);
db.colors = require('./models/colors.model.js')(sequelize, Sequelize);
db.sizes = require('./models/sizes.model.js')(sequelize, Sequelize);
db.products = require('./models/products.model.js')(sequelize, Sequelize);
db.productsCategories = require('./models/productsCategories.model.js')(sequelize,Sequelize);
db.cards = require('./models/cards.model.js')(sequelize, Sequelize);
db.carts = require('./models/carts.model.js')(sequelize, Sequelize);
db.wallets = require('./models/wallets.model.js')(sequelize, Sequelize);
db.User = require('./models/users.model.js')(sequelize, Sequelize);
db.cartsItems = require('./models/cartItems.model.js')(sequelize, Sequelize);
db.deliveries = require('./models/deliveries.model.js')(sequelize, Sequelize);

// db.City = require('./models/city.model.js')(sequelize, Sequelize);
// db.District = require('./models/district.model.js')(sequelize, Sequelize)
// db.File = require('./models/file.model.js')(sequelize, Sequelize)

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
