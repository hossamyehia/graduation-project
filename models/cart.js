const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: false
    },
});

let cart = mongoose.model('cart', cartSchema);

module.exports = cart;