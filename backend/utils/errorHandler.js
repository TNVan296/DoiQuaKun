const handleError = (error) => {
  console.error('Error occurred:', error);
  const response = {
    error: true,
    message: error.message || 'Đã xảy ra lỗi không xác định.',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined, 
  };

  return response;
};

module.exports = handleError;
