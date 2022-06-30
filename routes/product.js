var express = require('express');
var router = express.Router();

const productController = require('../controllers/product');

router.route('/')
// add product
.post(productController.add)
//get products
.get(productController.get);

router.route("/:id")
// get product data
.get(productController.getOne)


module.exports = router;