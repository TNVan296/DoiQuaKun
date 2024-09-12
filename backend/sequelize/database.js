// model/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MLteachProject', 'root', 'Hung199535hcm@', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.pictures = require('./models/pictures.model')(sequelize, Sequelize);
db.colors = require('./models/colors.model')(sequelize, Sequelize);
db.sizes = require('./models/sizes.model')(sequelize, Sequelize);
db.products = require('./models/products.model')(sequelize, Sequelize);
db.productsCategories = require('./models/productsCategories.model')(sequelize,Sequelize);
db.cards = require('./models/cards.model')(sequelize, Sequelize);
db.carts = require('./models/carts.model')(sequelize, Sequelize);
db.wallets = require('./models/wallets.model')(sequelize, Sequelize);
db.users = require('./models/users.model')(sequelize, Sequelize);
db.cartsItems = require('./models/cartItems.model')(sequelize, Sequelize);
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
