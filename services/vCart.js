const vCarts = require('../models/virtualCart');

/**
 * Create New Virtual Cart
 * 
 * @param {String} cart_id 
 * @returns Cart Data || Error Object
 */
const create = (cart_id) => {
    return new Promise((resolve, reject) => {

        vCarts.insertMany({ cart_id: cart_id}).then((cart) => {
            resolve(cart);
        }).catch(err => reject(err));
        
    });
}

/**
 * Get All Virtual Cart Data
 * 
 * @returns Cart Data || Error Object
 */
const getAll = () => {
    return new Promise((resolve, reject) => {

        vCarts.find({}).sort({closed: 1}).then((carts) => {
            resolve(carts);
        }).catch(err => reject(err));
        
    });
}

/**
 * Get All Virtual Cart Data
 * 
 * @returns Cart Data || Error Object
 */
 const getActive = () => {
    return new Promise((resolve, reject) => {

        vCarts.find({closed: 0}).then((carts) => {
            resolve(carts);
        }).catch(err => reject(err));
        
    });
}

/**
 * Get All Virtual Cart for Specific User
 * @param {String} user_id 
 * @returns Cart Data || Error Object
 */
const getForUser = (user_id) => {
    return new Promise((resolve, reject) => {
        vCarts.find({user_id: user_id}).sort({closed: 1}).then((carts) => {
            console.log(carts)
            resolve(carts);
        }).catch(err => reject(err));
    });
}

/**
 * Get All Virtual Cart for Specific Gateway
 * 
 * @param {Number} gateway_number 
 * @returns Cart Data || Error Object
 */
const getForGate = (gateway_number) => {
    return new Promise((resolve, reject) => {

        vCarts.find({gateway_number: gateway_number}).sort({closed: 1}).then((carts) => {
            resolve(carts);
        }).catch(err => reject(err));
        
    });
}

/**
 * Get All Active Virtual Cart for Specific Gateway
 * 
 * @param {Number} gateway_number 
 * @returns Cart Data || Error Object
 */
 const getActiveForGate = (gateway_number) => {
    return new Promise((resolve, reject) => {

        vCarts.find({gateway_number: gateway_number, closed: 0}).then((carts) => {
            resolve(carts);
        }).catch(err => reject(err));
        
    });
}

/**
 * Get Virtual Cart Data
 * 
 * @param {String} vCartId 
 * @returns Cart Data || Error Object
 */
 const getById = (vCartId) => {
    return new Promise((resolve, reject) => {

        vCarts.findOne({_id: vCartId},{_v:0,createdat:0,updatedat:0}).then((cart) => {
            resolve(cart);
        }).catch(err => reject(err));
        
    });
}

/**
 * Handle Virtual Cart Validation
 * 
 * @param {String} vCartId 
 * @returns Cart Data || Error Object
 */
const validate = (vCartId) => {
    return new Promise((resolve, reject) => {

        vCarts.findOne({_id: vCartId},{gateway_number:0,createdate:0,updatedate:0,__v:0,"products.image":0,"products.__v":0,"products.barcode":0,"products.name":0}).then((cart) => {
            resolve(cart);
        }).catch(err => reject(err));
        
    });
}

/**
 * Add New Product To Cart
 * @param {Object} product Product Data
 * @returns Cart New Data || Error Object
 */
const addProduct = (v_cart_id, product) =>{
    return new Promise((resolve, reject) => {
        vCarts.updateOne({_id: v_cart_id},{ $push: {products: product}, $inc: {numberOfProduct: 1,expected_weight: product.weight, totalPrice: product.price}}).then((res) => {
            resolve(res);
        }).catch(err => reject(err));
    });
}


/**
 * Update Virtual Cart`s Products Quantity
 * 
 * @param {String} v_cart_id Cart ID
 * @param {Object} product Product
 * @param {Number} value Quantity
 * @returns Update Results || Error Object
 */
const updateQuantity = (id, product, value) => {
    return new Promise((resolve, reject) => {

        vCarts.updateOne({_id: id, products: { $elemMatch: {_id: product._id} }}, {$inc: {expected_weight:  value * product.weight,totalPrice: value * product.price, numberOfProduct: value, "products.$.quantity": value}}).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err)
        });
        
    });
}

/**
 * remove Product from Cart
 * @param {String} v_cart_id Cart ID
 * @param {Object} product Product
 * @returns Update Results || Error Object
 */
const removeProduct = (v_cart_id, product) => {
    return new Promise((resolve, reject) => {

        vCarts.updateOne({_id: v_cart_id}, {$pull: { products: { _id: product._id} },$inc: {expected_weight:  -1 * product.quantity * product.weight,totalPrice: -1 * product.quantity * product.price, numberOfProduct: -1 * product.quantity} }).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err)
        });
        
    });
}

/**
 * Change the Actual Weight
 * @param {String} id 
 * @param {Number} value 
 * @returns Cart New Data || Error Object
 */
const changeWeight = (id, value) =>{
    return new Promise((resolve, reject) => {

        vCarts.updateOne({_id: id},{ $inc: {actual_weight: value} }).then((res) => {
            resolve(res);
        }).catch(err => reject(err));
        
    });
}


/**
 * Adding Owner of the cart
 * @param {String} id 
 * @returns 
 */
const setUser = (id, user_id) => {
    return new Promise((resolve, reject) => {
        vCarts.findOne({_id: id}).then( cart => {
            if(cart){
                cart.user_id = user_id;

                cart.save().then( user => {
                    resolve(cart);
                }).catch(err => reject(err));
            }else{
                resolve(null);
            }
        }).catch(err => reject(err));
    });
}


/**
 * Close the Virtual Cart
 * @param {*} id 
 * @returns 
 */
const close = (id, number) => {
    return new Promise((resolve, reject) => {

        vCarts.updateOne({_id: id},{ $set: {gateway_number: number, closed: true} }).then((res) => {
            resolve(res);
        }).catch(err => reject(err));
        
    });
}


module.exports = {
    create,
    getById,
    validate,
    getAll,
    getActive,
    getForUser,
    getForGate,
    getActiveForGate,
    addProduct,
    updateQuantity,
    removeProduct,
    changeWeight,
    setUser,
    close
}

