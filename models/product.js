const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    barcode:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
});

let product = mongoose.model('product', productSchema);

module.exports = {
    Product:product,
    productSchema: productSchema
};