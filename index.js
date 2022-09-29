require('dotenv').config();
require('express-async-errors');

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const errorHandler = require('./middleware/error');
const productsRoutes = require('./routes/products');

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  )
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products route</a>');
});

app.use('/api/v1/products', productsRoutes);

app.use(errorHandler);
app.use((req, res) => {
  res.status(404).send('Route dose not exist!');
});
