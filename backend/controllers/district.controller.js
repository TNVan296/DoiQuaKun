const db = require("../models");
const District = db.District;
// const Op = db.Sequelize.Op;

exports.findOne = (req, res) => {
  const id = req.params.id;
  // TODO: move this to a service
  District.findByPk(id)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find district with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving district with id=" + id
    });
  });
};
exports.findAll = (req,res) => {
  const cityId = req.query.cityId;
  // TODO: move this to a service
  District.findAll({
    where: {
      cityId: cityId
    }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving district."
    });
  });
}