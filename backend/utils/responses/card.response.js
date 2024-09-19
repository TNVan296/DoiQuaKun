const cardResponseTemplate = (data) => {
    return {
      data: {
        card: data,
        message: 'Card operation completed successfully'
      }
    };
  };
  
  module.exports = cardResponseTemplate;
  