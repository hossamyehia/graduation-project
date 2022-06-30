const productService = require('../services/product');


/**
 * It hanldes Product Adding API
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
 const add = (req, res, next) => {
    
    productService.add(req.body).then( product =>{
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, product: product});
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
   
}


/**
 * Get Products data
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
const get = (req, res, next) => {
    
    productService.getAll().then( products =>{
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, products: products});
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
   
}


/**
 * Get Products data
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
const getOne = (req, res, next) => {
    productService.getById(req.params["id"]).then( products =>{
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, products: products});
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
}

module.exports = {
    add,
    get,
    getOne
}