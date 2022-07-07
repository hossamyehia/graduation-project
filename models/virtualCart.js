const mongoose = require('mongoose');
const {productSchema} = require("./product");
const Schema = mongoose.Schema;

const virtualCartSchema = new Schema({
    cart_id:{
        type: mongoose.ObjectId,
        required: true
    },
    cart_name:{
        type: String,
        default: "Payment Gate"
    },
    user_id:{
        type: mongoose.ObjectId,
        default: "000000000000000000000000"
    },
    gateway_number:{
        type: Number,
        default: null
    },
    actual_weight: {
        type: Number,
        default: 0
    },
    expected_weight: {
        type: Number,
        default: 0
    },
    numberOfProduct:{
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    products:[
        productSchema
    ],
    closed: {
        type: Boolean,
        default: 0
    }
},{
    timestamps: true
});

let virtualCart = mongoose.model('virtualCart', virtualCartSchema);

module.exports = virtualCart;