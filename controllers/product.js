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


module.exports = {
    add
}