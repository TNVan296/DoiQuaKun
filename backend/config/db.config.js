require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.MYSQL_USER || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "Hung199535hcm@",
  DB: process.env.MYSQL_DATABASE || "MLteachProject",
  PORT: process.env.MYSQL_PORT || "3306",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};