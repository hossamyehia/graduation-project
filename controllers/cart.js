const cartService = require('../services/cart');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const add = (req, res, next) => {

    let name = req.body.name;
    
    cartService.add(name).then(cart => {
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: 'Cart Added Successful!', Cart: cart})
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
   
}


module.exports = {
    add
}