var express = require('express');
var router = express.Router();
const passport = require('passport');
const authenticate = require('../config/auth');

const usersController = require('../controllers/cashier');

// Add New Cashier
router.post('/register', usersController.signup);

// login
router.post('/login', passport.authenticate('local'), usersController.login)

// logout
router.post('/logout', authenticate.verifyUser, usersController.logout);

module.exports = router;
