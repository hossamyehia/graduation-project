const paymentGateway = require('../models/payGate');
const PaymentGateway = require('../models/payGate');

/**
 * Add New Gateway
 * @param {Number} number Gate Number
 * @returns Promise "New Data" || "Error"
 */
const add = (number) => {
    return new Promise((resolve, reject) => {

        PaymentGateway.insertMany({id: number}).then((gateway) => {
            resolve(gateway);
        }).catch(err => {
            reject(err);
        });
        
    });
}

/**
 * Get Gateway Data By ID
 * @param {String} id Gate ID
 * @returns Promise "Gate Data" || "Error"
 */
const getById = (id) => {
    return new Promise((resolve, reject) => {
        
        PaymentGateway.findOne({_id: id}).then( (gateway) => {
            resolve(gateway);
        }).catch(err => reject(err));
        
    });
}

/**
 * Get Gateway Data By Number
 * @param {Number} number Gate Number
 * @returns Promise "Gate Data" || "Error"
 */
const getByNumber = (number) => {
    return new Promise((resolve, reject) => {
        
        PaymentGateway.findOne({id: number}).then( (gateway) => {
            resolve(gateway);
        }).catch(err => reject(err));
        
    });
}


/**
 * Update Gateway Data
 * @param {String} id 
 * @param {Object} data 
 * @returns Promise "New Data" || "Error"
 */
const update = (id, data) => {
    return new Promise((resolve, reject) => {

        PaymentGateway.updateOne({_id: id},{ $set: data }).then( (status) => {
            resolve(status);
        }).catch(err => reject(err));
        
    });
}

/**
 * it returns the Gateway with the Shortest queue line
 * @returns Promise Shortest Path || "Error"
 */
const getShortPath = () => {
    return new Promise((resolve, reject) => {
        paymentGateway.aggregate([{ $project: { number: "$id", queue: "$queue_length", product: "$number_of_products" } },{$sort: {status: 1, queue: 1,product:1}},{ $limit: 1 }]).then( (gateway) => {
            resolve(gateway[0]);
        }).catch(err => reject(err));
        
    });
}


/**
 * Add Virtual Cart to Queue
 * @param {String} id 
 * @param {Object} vCart 
 * @returns Promise "New Data" || "Error"
 */
const addQueue = (id, vCart) => {
    return new Promise((resolve, reject) => {

        PaymentGateway.updateOne({id: id},{ $inc: {queue_length: 1, number_of_products: vCart.numberOfProduct}, $push: {queue: vCart} }).then( (status) => {
            resolve(status);
        }).catch(err => reject(err));
        
    });
}

/**
 * Remove Virtual Cart from Queue
 * @param {String} gate_id 
 * @param {String} vCart_id 
 * @returns Promise "New Data" || "Error"
 */
const popQueue = (id, vCart) => {
    return new Promise((resolve, reject) => {

        PaymentGateway.updateOne({_id: id, queue: { $elemMatch: { _id: vCart._id } } },
                { $inc: {queue_length: -1, number_of_products: -1 * vCart.numberOfProduct, daily_balance: vCart.totalPrice},
                $pull: {queue: {_id: vCart._id}} }).then( (status) => {
                    
            resolve(status);
        }).catch(err => reject(err));
        
    });
}


module.exports = {
    add,
    getById,
    getByNumber,
    getShortPath,
    update,
    addQueue,
    popQueue,
}