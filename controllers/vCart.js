const productService = require('../services/product');
const vCartService = require('../services/vCart');
const cartService = require('../services/cart');
const payGateService = require('../services/payGate');
const { response } = require('express');

/**
 * It hanldes virtual cart creation API
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
const create = (req, res, next) => {

    let cart_id = req.body.cart_id;
    
    cartService.update(cart_id, {status: true}).then(cart => {
        vCartService.create(cart_id).then( (vCart) => {
            res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: 'Cart Created Successful!', Cart: vCart})
        }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
   
}

/**
 * Select Virtual Cart
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
const select = (req, res, next) => {
    let cart_id = req.query.id;

    vCartService.getById(cart_id).then(vCart => {
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, Cart: vCart})    
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
}

/**
 * It hanldes Adding Products API
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
const addProduct = (req, res, next) => {

    let cart_id = req.query.id;

    productService.getByBarcode(req.body.barcode).then( product =>{
        if(!product){
            res.status(404).setHeader('Content-Type', 'application/json').json({success: false, status: 'Product Not Found'})
        }else{
            productService.updateQuantity(product._id, -1).then( (response) => {
                
                
                product.quantity = 1;
                let prod = req.vcart.products.find( ({ _id }) => {
                    return _id.toString() === product.id
                });

                if(prod){

                    vCartService.updateQuantity(cart_id, prod, 1).then((response) => {
                        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, product: product});
                    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));

                }else{

                    vCartService.addProduct(cart_id, product).then( (response) => {
                        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, product: product});
                    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
                }   
            }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
        }
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
    
   
}

/**
 * It hanldes Get Products API
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
const getProducts = (req, res, next) => {

    let cart_id = req.query.id;

    vCartService.getById(cart_id).then(vCart => {
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, Products: vCart.products})    
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
   
}


/**
 * It hanldes Products Quantity Changing API
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
const updateQuantity = (req, res, next) => {

    let product = req.vcart.products.find( ({ _id }) => _id.toString() === req.body._id );
    let cart_id = req.query.id;
    let quantity = req.body.quantity;

    if(!product){
        res.status(400).setHeader('Content-Type', 'application/json').json({success: true, status: "You haven`t added this product yet"});
    }else{
        productService.updateQuantity(product._id, -quantity).then( (response) => {
            if(response.modifiedCount == 0){
                res.status(404).setHeader('Content-Type', 'application/json').json({success: true, status: "This Product doesnot exist"});
            }else{
                vCartService.updateQuantity(cart_id, product, quantity).then( (response) => {
    
                    res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: "Update Done!"});
        
                }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({success: false,err: err}));
            }
    
        }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({success: false,err: err}));
    }

    
   
}

/**
 * It hanldes Removing Products API
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const removeProduct = (req, res, next) => {

    let product = req.vcart.products.find( ({ _id }) => _id.toString() === product.id );
    let cart_id = req.query.id;

    if(!product){
        res.status(404).setHeader('Content-Type', 'application/json').json({success: true, status: "this product is not in your cart"});
    }else{
        vCartService.removeProduct(cart_id, product).then( (response) => {

            productService.updateQuantity(product._id, product.quantity).then( (response) => {
             
                res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: "Removed!"});
    
            }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({success: false,err: err}));
            
    
        }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({success: false,err: err}));
    }
}

/**
 * it handles Changing the Actual Weight
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const changeWeight = (req, res, next) => {
    let cart_id = req.query.id;
    let value = req.body.weight;

    vCartService.changeWeight(cart_id, value).then( (response) => {
         
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: "Done!"});

    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({success: false,err: err}));

}

const checkOut = (req, res, next) => {
    let cart_id = req.query.id;
    let vCart = req.vcart;
    delete vCart.products;

    payGateService.getShortPath().then( (gateway) => {
        payGateService.addQueue(gateway.number,vCart).then(response => {
            vCartService.close(cart_id,gateway.number).then(response => {
                res.status(200).setHeader('Content-Type', 'application/json').json({success: true, gatewayNumber : gateway.number})
            }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
        }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));

}


module.exports = {
    create,
    select,
    addProduct,
    getProducts,
    removeProduct,
    updateQuantity,
    changeWeight,
    checkOut,
}