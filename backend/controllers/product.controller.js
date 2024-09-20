const db = require("../models/database.js");
const Product = db.Product;

exports.findOne = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find that product with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving product with id=" + id
    });
  });
};

exports.findAll = (req, res) => {
  Product.findAll()
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