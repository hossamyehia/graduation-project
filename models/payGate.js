const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {queueSchema} = require('./queue');

const paymentGatewaySchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    cashier_id:{
        type: mongoose.ObjectId,
        default: "000000000000000000000000"
    },
    status: {
        type: String,
        default: "notWorking"
    },
    daily_balance:{
        type: Number,
        default: 0
    },
    queue_length: {
        type: Number,
        default: 0
    },
    number_of_products:{
        type: Number,
        default: 0
    },
    queue:[
        queueSchema
    ]
});

let paymentGateway = mongoose.model('paymentGateway', paymentGatewaySchema);

module.exports = paymentGateway;