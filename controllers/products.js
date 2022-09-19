const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: 'Get all products static' });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'Get all products' });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
