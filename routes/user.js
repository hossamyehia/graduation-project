var express = require('express');
var router = express.Router();
const passport = require('passport');
const authenticate = require('../config/auth');

const userController = require('../controllers/user');

// Add New Cashier
router.post('/register', userController.signup);

// login
router.post('/login', passport.authenticate('local-User'), userController.login);

// Add Cart To his Account
router.post('/addcart', authenticate.verifyUser, userController.addCart);

// Get Carts
router.get('/getcarts', authenticate.verifyUser, userController.getCarts);

// logout
router.post('/logout', authenticate.verifyUser, userController.logout);

module.exports = router;
