// populate.js used to add products.json to the database

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const jsonProducts = require('./products.json');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log('Products.json has been added to the database!');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
