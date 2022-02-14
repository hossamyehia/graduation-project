const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const balanceSchema = new Schema({
    gateway_id:{
        type: mongoose.ObjectId,
        required:true
    },
    balance: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

let balance = mongoose.model('balance', balanceSchema);

module.exports = balance;