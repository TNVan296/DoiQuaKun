const db = require("../sequelize/database.js");
const City = db.City;

const FindAllCities = () => {
  return City.findAll();
}

module.exports = {
  FindAllCities
};
