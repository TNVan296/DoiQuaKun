const db = require("../models");
const City = db.City;

const FindAllCities = () => {
  return City.findAll();
}

module.exports = {
  FindAllCities
};
