const Cart = require('../models/cart');

/**
 * Add New Cart Data to the system
 * @param {String} name Cart Name
 * @returns Promise "New Cart" || "Error"
 */
const add = (name)=> {
    return new Promise((resolve, reject) => {

        Cart.insertMany({name: name}).then((cart) => {
            resolve(cart);
        }).catch(err => {
            reject(err);
        });
        
    });
}

/**
 * Update Cart Data
 * @param {String} id Cart ID
 * @param {Object} data New Data
 * @returns Promise "Updated Cart" || "Error"
 */
const update = (id, data) => {
    return new Promise((resolve, reject) => {

        Cart.updateOne({_id: id},{$set: data}).then((cart) => {
            resolve(cart);
        }).catch(err => {
            reject(err);
        });
        
    });
}

/**
 * Remove Cart from the system
 * @param {String} id 
 * @returns Promise "Deleted Cart" || "Error"
 */
const remove = (id) => {
    return new Promise((resolve, reject) => {

        Cart.deleteOne({_id: id}).then((cart) => {
            resolve(cart);
        }).catch(err => {
            reject(err);
        });
        
    });
}

module.exports = {
    add,
    update,
    remove,
}