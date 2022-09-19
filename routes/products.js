const { Router } = require('express');
const router = Router();

const {
  getAllProductsStatic,
  getAllProducts,
} = require('../controllers/products');

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);

module.exports = router;
