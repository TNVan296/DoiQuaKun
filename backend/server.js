const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const db = require('./sequelize/database.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Khởi tạo Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'))

app.use('/public', express.static(path.join(__dirname, 'public')));

const api = require('./routes/index.js');
app.use('/api', api);


app.listen(process.env.PORT, function () {
  console.log('Node server running @ http://localhost:3000');
  console.log('Swagger Docs available at http://localhost:3000/api-docs');
});

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Đồng bộ cơ sở dữ liệu thành công.');
  })
  .catch((err) => {
    console.error('Lỗi khi đồng bộ cơ sở dữ liệu:', err);
  });
