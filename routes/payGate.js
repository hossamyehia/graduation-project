var express = require('express');
var router = express.Router();
const authenticate = require('../config/auth');

const gatewayController = require('../controllers/payGate');
const validate = require('../controllers/validate');

// Add New Gateway
router.post('/addgateway', authenticate.verifyUser,gatewayController.add);

// Refresh Gateway Queue
router.get('/refreshqueue', authenticate.verifyUser, validate.isPaymentGate, gatewayController.refreshQueue);


router.put('/checkout', authenticate.verifyUser, validate.isVirtualCart, validate.isClosed,gatewayController.checkOut)


module.exports = router;