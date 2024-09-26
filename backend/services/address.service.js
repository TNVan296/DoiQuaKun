const db = require('../sequelize/database.js');

const getCities = async () => {
  try {
    const cities = await db.City.findAll({
      attributes: ['id', 'name'], 
    });
    return { success: true, data: cities, message: 'Cities fetched successfully' };
  } catch (error) {
    return { success: false, message: 'Error while fetching cities' };
  }
};

const getDistrictsByCityId = async (cityId) => {
  try {
    const districts = await db.District.findAll({
      where: { cityId },
      attributes: ['id', 'name'],
    });
    if (districts.length === 0) {
      return { success: false, message: 'No districts found for this city' };
    }
    return { success: true, data: districts, message: 'Districts fetched successfully' };
  } catch (error) {
    return { success: false, message: 'Error while fetching districts' };
  }
};

const getWardsByDistrictId = async (districtId) => {
  try {
    const wards = await db.Ward.findAll({
      where: { districtId },
      attributes: ['id', 'name'],
    });
    if (wards.length === 0) {
      return { success: false, message: 'No wards found for this district' };
    }
    return { success: true, data: wards, message: 'Wards fetched successfully' };
  } catch (error) {
    return { success: false, message: 'Error while fetching wards' };
  }
};

module.exports = {
  getCities,
  getDistrictsByCityId,
  getWardsByDistrictId,
};
