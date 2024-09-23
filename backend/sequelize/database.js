// model/database.js
const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,

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

db.Picture = require('./models/pictures.model.js')(sequelize, Sequelize);
db.Color = require('./models/colors.model.js')(sequelize, Sequelize);
db.Size = require('./models/sizes.model.js')(sequelize, Sequelize);
db.Product = require('./models/products.model.js')(sequelize, Sequelize);
db.ProductCategory = require('./models/productsCategories.model.js')(sequelize,Sequelize);
db.Card = require('./models/cards.model.js')(sequelize, Sequelize);
db.Cart = require('./models/carts.model.js')(sequelize, Sequelize);
db.Wallet = require('./models/wallets.model.js')(sequelize, Sequelize);
db.User = require('./models/users.model.js')(sequelize, Sequelize);
db.CartItem = require('./models/cartItems.model.js')(sequelize, Sequelize);

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
