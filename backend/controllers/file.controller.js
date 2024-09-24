const { upload } = require('../config/multer.config'); // Import cấu hình multer
const { createFile } = require('../services/file.service');

const uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Upload file thất bại', error: err.message });
    }
    try {
      const files = req.files; // Lấy mảng các file từ req.files
      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Không có file nào được tải lên' });
      }

      const uploadedFiles = [];
      for (const file of files) {
        const filePath = `public/${file.filename}`;
        const newFile = await createFile({ ...file, path: filePath }); 
        uploadedFiles.push(newFile);
      }

      return res.status(201).json({
        message: 'Upload file thành công',
        files: uploadedFiles, // Trả về danh sách các file đã upload thành công
      });
    } catch (error) {
      return res.status(500).json({ message: 'Lưu thông tin file thất bại', error: error.message });
    }
  });
};

module.exports = {
  uploadFile,
};
