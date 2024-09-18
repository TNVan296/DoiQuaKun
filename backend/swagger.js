const swaggerJsDoc = require('swagger-jsdoc');

// Cấu hình Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API for Dong Dien Thieu Nhi',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Tùy chọn, thường dùng với JWT
        },
      },
    },
    security: [
      {
        BearerAuth: [], // Áp dụng bảo mật cho tất cả các API
      },
    ],
  },
  apis: ['./routes/*.js'], // Đường dẫn tới các file chứa định nghĩa API
};

// Khởi tạo Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;