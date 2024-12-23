const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./sequelize/database.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'public')));

// Khởi tạo Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const corsOptions = process.env.ENV === 'production'
    ? {
          origin: 'https://doiquakun.thuongnva.io.vn', // Domain của production
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true, // Cho phép cookie
      }
    : {
          origin: 'http://localhost:3000', // Domain cho môi trường dev
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true, // Cho phép cookie
      };

app.use(cors(corsOptions));
if (process.env.ENV === 'production') {
    // Ghi log chi tiết hơn trong production
    app.use(morgan('combined')); // Combined log format: thông tin đầy đủ
} else {
    // Ghi log đơn giản hơn trong dev
    app.use(morgan('dev')); // Dev log format: ngắn gọn, dễ đọc
}

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