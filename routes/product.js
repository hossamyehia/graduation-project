var express = require('express');
var router = express.Router();

const productController = require('../controllers/product');

router.route('/')
// add product
.post(productController.add)



module.exports = router;