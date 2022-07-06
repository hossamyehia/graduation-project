var express = require('express');
var router = express.Router();
const authenticate = require('../config/auth');

const gatewayController = require('../controllers/payGate');
const validate = require('../controllers/validate');

// Add New Gateway
router.post('/addgateway', authenticate.verifyCashier,gatewayController.add);

// Refresh Gateway Queue
router.get('/refreshqueue', authenticate.verifyCashier, validate.isPaymentGate, gatewayController.refreshQueue);


router.put('/checkout', authenticate.verifyCashier, validate.isVirtualCart, validate.isClosed,gatewayController.checkOut)


module.exports = router;