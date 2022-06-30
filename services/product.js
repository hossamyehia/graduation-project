const product = require('../models/product');
const { Product } = require('../models/product');

/**
 * Add New Products To Data
 * 
 * @param {Array} products Array of proudcts
 * @returns New Products Data || Error Object
 */
const add = (products) => {
    return new Promise((resolve, reject) => {

        Product.insertMany(products, { ordered: false }).then((Data) => {
            resolve(Data);
        }).catch(err => reject(err));

    });
}

/**
 * products
 * @returns ALL Product
 */
const getAll = () => {
    return new Promise((resolve, reject) => {
        Product.find({}).then((Data) => {
            resolve(Data);
        }).catch(err => reject(err));
    });
}

/**
 * Find Product By ID
 * 
 * @param {String} id Product ID
 * @returns Product Data || Error Object
 */
const getById = (id) => {
    return new Promise((resolve, reject) => {

        Product.findOne({ _id: id }).then((Data) => {
            resolve(Data);
        }).catch(err => reject(err));

    });
}

/**
 * Find Product By Barcode
 * @param {String} barcode Product barcode
 * @returns Product Data || Error Object
 */
const getByBarcode = (barcode) => {
    return new Promise((resolve, reject) => {

        Product.findOne({ barcode: barcode }).then((Data) => {
            resolve(Data);
        }).catch(err => reject(err));

    });
}

/**
 * Find Product
 * 
 * @param {Object} info 
 * @returns Product Data || Error Object
 */
const get = (info) => {
    return new Promise((resolve, reject) => {
        Product.findOne(info).then((Data) => {
            resolve(Data);
        }).catch(err => reject(err));
    });
}

/**
 * Update Product By Barcode
 * @param {String} id 
 * @param {Object} data 
 * @returns Product New Data || Error Object
 */
const updateById = (id, data) => {
    return new Promise((resolve, reject) => {

        Product.updateOne({ _id: id }, { $set: data }).then((Data) => {
            resolve(Data);
        }).catch(err => reject(err));

    });
}

/**
 * Update Product By Barcode
 * @param {String} barcode 
 * @param {Object} data 
 * @returns Product New Data || Error Object
 */
const updateByBarcode = (barcode, data) => {
    return new Promise((resolve, reject) => {

        Product.updateOne({ barcode: barcode }, { $set: data }).then((Data) => {
            resolve(Data);
        }).catch(err => reject(err));

    });
}

/**
 * Update Product Quantity
 * @param {String} id 
 * @param {Number} value 
 * @returns Product New Data || Error Object
 */
const updateQuantity = (id, value) => {
    return new Promise((resolve, reject) => {

        Product.updateOne({ _id: id, quantity: { $gt: 0 } }, { $inc: { quantity: value } }).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });

    });
}

/**
 * Remove Product By ID
 * @param {String} id Product ID
 * @returns Product Data || Error Object
 */
const removeById = (id) => {
    return new Promise((resolve, reject) => {

        Product.deleteOne({ _id: id }).then((Data) => {
            resolve(Data);
        }).catch(err => reject(err));

    });
}


/**
 * Remove Product By Barcode
 * @param {String} barcode Product barcode
 * @returns Product Data || Error Object
 */
const removeByBarcode = (barcode) => {
    return new Promise((resolve, reject) => {

        Product.deleteOne({ barcode: barcode }).then((Data) => {
            resolve(Data);
        }).catch(err => reject(err));

    });
}




module.exports = {
    add,
    getAll,
    getById,
    getByBarcode,
    get,
    updateById,
    updateByBarcode,
    updateQuantity,
    removeById,
    removeByBarcode

}