var express = require('express');
var router = express.Router();

const vCartController = require('../controllers/vCart');
const validate = require('../controllers/validate');


router.route('/')
// create cart
.post(validate.isCartOrPaygate, vCartController.create)
// Select Cart
.get(validate.isVirtualCart, vCartController.select);

router.route('/products')
// Add Product
.post(validate.isVirtualCart, validate.isOpen, vCartController.addProduct)
// get all Products
.get(validate.isVirtualCart, validate.isOpen,vCartController.getProducts)
// Update Products Quantity
.put(validate.isVirtualCart, validate.isOpen,vCartController.updateQuantity)
//remove Product
.delete(validate.isVirtualCart, validate.isOpen,vCartController.removeProduct);

router.route('/weight')
// Update Actual Weight
.put(validate.isVirtualCart, validate.isOpen,vCartController.changeWeight);


router.route('/checkout')
// Cart Check Out
.put(validate.isVirtualCart, validate.isOpen, vCartController.checkOut)


module.exports = router;