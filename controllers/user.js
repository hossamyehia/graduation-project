const passport = require('passport');
const User = require('../models/user');
const authenticate = require('../config/auth');
const error = require("../services/errors");

const vCartService = require('../services/vCart');


/**
 * User register
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
let signup = (req, res, next) => {
    User.register(new User({username: req.body.username, name:req.body.name}), req.body.password)
    .then( (user) => {
        passport.authenticate('local-User')(req, res, () => {
            res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: 'Registration Successful!'}) 
        });
    }).catch(err => error(res, 500, err));
}



/**
 * User login
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
let login = (req, res, next) => {
    let token = authenticate.getToken({_id: req.user._id});
    vCartService.getForUser(req.user._id).then( carts => {
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, token: token, carts: carts});
    }).catch(err => error(res, 500, err));
    
}

/**
 * Adding Cart To User account
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const addCart = (req, res, next) => {
    let id = req.body.id;
    vCartService.setUser(id, req.user._id).then( cart => {
        if(cart){
            res.status(200).setHeader('Content-Type', 'application/json').json({success: true, cart: cart});
        }else{
            res.status(404).setHeader('Content-Type', 'application/json').json({success: false, status: "Cart Not Found"});
        }
    }).catch(err => error(res, 500, err));
}

/**
 * Get Cart List
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getCarts = (req, res, next) => {
    vCartService.getForUser(req.user._id).then( carts => {
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, carts: carts});
    }).catch(err => error(res, 500, err));
}

/**
 * User logout
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
let logout = (req, res, next) => {
    
    if(req.user == null){
        res.status(400).setHeader('Content-Type', 'application/json').json({success: false, status: "you are logged out already"});
    }else{
        req.logout();
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: "Successfully Logged out"});
    }
}


module.exports = {
    signup,
    login,
    addCart,
    getCarts,
    logout
}