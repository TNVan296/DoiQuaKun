const { File } = require('../models/index');

const createFile = async (file) => {
  const fileRecord = await File.create({
    name: file.originalname,
    path: `/media/uploads/${file.filename}`,
    createdAt: new Date()
  });

  return fileRecord;
};

module.exports = {
  createFile
};
