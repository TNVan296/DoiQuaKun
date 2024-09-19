const db = require("../models");
const City = db.City;
// const Op = db.Sequelize.Op;

const CityService = require('../services/city.service');

exports.findOne = (req, res) => {
  const id = req.params.id;
  // TODO: move this to a service
  City.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find city with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving city with id=" + id
      });
    });
};

exports.findAll = async (req,res) => {
  try {
    const cities = await CityService.FindAllCities();
    res.status(200).send(cities);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving city!"
    })
  }
}