var express = require('express');
var router = express.Router();

const cartController = require('../controllers/cart');

// create cart
router.post('/add', cartController.add);

// TODO: remove cart



module.exports = router;