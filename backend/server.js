const express = require("express");
const cors = require("cors");
const morgan = require('morgan');

require("dotenv").config();

global.__basedir = __dirname

const app = express();

app.use(cors());

app.use(morgan('combined'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// RUN THIS CODE WHEN YOU WANT TO SYNC THE DATABASE
// const db = require("./models")
// db.sequelize.sync({ force: false }).then(() => {
//   console.log("Synced")
// });

const routes = require('./routes');
app.use('/api', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
