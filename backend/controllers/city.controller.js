const db = require("../models");
const City = db.City;
// const Op = db.Sequelize.Op;

exports.findOne = (req, res) => {
  const id = req.params.id;
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
exports.findAll = (req,res) => {
  City.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving city."
    });
  });
}