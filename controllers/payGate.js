const payGateService = require('../services/payGate');


/**
 * Add new Gateway
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
let add = (req, res, next) => {
    payGateService.add(req.body.number).then( (gateway) => {
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, id: gateway._id, status: 'Gateway Added!'});
    }).catch( err => {
        if(err.code === 11000){
            err = {
                name: "GatewayExistsError",
                message: "A gateway with the given number is already exists"
            }
        }
        res.status(500).setHeader('Content-Type', 'application/json').json(err)
    })
}


/**
 * Reload Queue
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
let refreshQueue = (req, res, next) => {
    payGateService.getById(req.query.id).then( (gateway) => {
        
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, queue : gateway.queue});

    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
}


/**
 * Check out handling
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
let checkOut = (req, res, next) => {

    let id = req.query.gateway;
    let vCart = req.vcart;
    delete vCart.products;

    payGateService.popQueue(id, vCart).then( (response) => {
        
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: "done"});

    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
    
}



module.exports = {
    add,
    refreshQueue,
    checkOut,
}