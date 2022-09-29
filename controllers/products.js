const Product = require('../models/Product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ company: 'caressa', featured: true });
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'Get all products' });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
