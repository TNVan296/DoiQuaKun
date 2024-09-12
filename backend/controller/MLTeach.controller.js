const getHello = (req, res) => {
    res.send({ message: 'Hello World' });
};



module.exports = {
    getHello,
};
