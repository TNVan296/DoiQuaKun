const { Picture } = require('../sequelize/database');

const createFile = async (file) => {
  try {
    const newFile = await Picture.create({
      name: file.originalname,
      path: file.path,
    });
    return newFile;
  } catch (error) {
    throw new Error('Không thể lưu thông tin file vào cơ sở dữ liệu');
  }
};

module.exports = {
  createFile,  
};
