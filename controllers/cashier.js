const passport = require('passport');
const Cashier = require('../models/cashier');
const sessionService = require('../services/sessions');
const authenticate = require('../config/auth');
const payGateService = require('../services/payGate');
const error = require("../services/errors");


/**
 * It handles Cashier signup
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
let signup = (req, res, next) => {
    Cashier.register(new Cashier({username: req.body.username, name:req.body.name, shift:req.body.shift}), req.body.password)
    .then( (user) => {
        passport.authenticate('local-Cashier')(req, res, () => {
            res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: 'Registration Successful!'}) 
        });
    }).catch(err => error(res, 500, err));
}



/**
 * cashier login to gateway
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
 let login = (req, res, next) => {

    let gate_id = req.query.id;
    let data = {
        cashier_id: req.user._id,
        status: "Working"
    }

    payGateService.update(gate_id,data).then( (gateway) => {
        
        let token = authenticate.getToken({_id: req.user._id});
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true,token: token, queue : gateway.queue});

        sessionService.add(req.query.id,req.user._id).catch(err => console.log(err));

    }).catch(err => error(res, 500, err) );

}

/**
 * cashier logout from gateway
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
 let logout = (req, res, next) => {
    let gate_id = req.query.id;
    let data = {
        cashier_id: "000000000000000000000000",
        status: "Not Working"
    }

    let id = req.user._id;
    req.logout();

    if(id == null){
        res.status(400).setHeader('Content-Type', 'application/json').json({success: false, status: "you are logged out already"});
    }else{
        payGateService.update(gate_id, data).then( (status) => {
            sessionService.close(req.query.id, id).then(() => {    
                res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: "Successfully Logged out"});
            }).catch(err => error(res, 500, err) );
        }).catch(err => error(res, 500, err) );
    }
}


module.exports = {
    signup,
    login,
    logout
}