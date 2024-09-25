const { getCities, getDistrictsByCityId, getWardsByDistrictId } = require('../services/address.service');

const getAllCities = async (req, res) => {
  const result = await getCities();

  if (result.success) {
    return res.status(200).send({ message: result.message, data: result.data });
  } else {
    return res.status(400).send({ message: result.message });
  }
};

const getDistricts = async (req, res) => {
  const cityId = req.params.cityId;
  const result = await getDistrictsByCityId(cityId);

  if (result.success) {
    return res.status(200).send({ message: result.message, data: result.data });
  } else {
    return res.status(400).send({ message: result.message });
  }
};

const getWards = async (req, res) => {
  const districtId = req.params.districtId;
  const result = await getWardsByDistrictId(districtId);

  if (result.success) {
    return res.status(200).send({ message: result.message, data: result.data });
  } else {
    return res.status(400).send({ message: result.message });
  }
};

module.exports = {
  getAllCities,
  getDistricts,
  getWards,
};
