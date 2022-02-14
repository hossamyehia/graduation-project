const payGateService = require('../services/payGate');
const vCartService = require('../services/vCart');

/**
 * Check if the given id is gate id
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
 let isPaymentGate = (req, res, next) => {
    payGateService.getById(req.query.id).then( (gateway) => {
        if(gateway){
            next();
        }else{
            res.status(404).setHeader('Content-Type', 'application/json').json({status: "Payment Gate Not Found"});
        }
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
}

/**
 * Check if the given id is Cart id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isVirtualCart = (req, res, next) => {
    let id = req.query.id ? req.query.id : req.body.id;
    vCartService.validate(id).then( (vCart) => {
        if(vCart){
            req.vcart = vCart; 
            next();
        }else{
            res.status(404).setHeader('Content-Type', 'application/json').json({status: "Virtual Cart Not Found"});
        }
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
}

/**
 * Check if the Cart is closed or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isOpen = (req, res, next) => {
    if(req.vcart.closed){
        res.status(400).setHeader('Content-Type', 'application/json').json({status: "This Cart is already closed"});
    }else{
        next();
    }
}

/**
 * Check if the Cart is closed or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const isClosed = (req, res, next) => {
    if(req.vcart.closed){
        next();
    }else{
        res.status(400).setHeader('Content-Type', 'application/json').json({status: "This Cart is still open"});
    }
}

module.exports = {
    isPaymentGate,
    isVirtualCart,
    isOpen,
    isClosed
}