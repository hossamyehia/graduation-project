const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const queueSchema = new Schema({
    vCart_id: {
        type: mongoose.ObjectId,
        required: true
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
    closed: {
        type: Boolean,
        default: 0
    }
},{
    timestamps: true
});

let Queue = mongoose.model('queue', queueSchema);

module.exports = {
    Queue,
    queueSchema
};