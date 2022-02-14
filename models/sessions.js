const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    gateway_id:{
        type: mongoose.ObjectId,
        required:true
    },
    cashier_id:{
        type: mongoose.ObjectId,
        required: true
    },
    ended: {
        type: Boolean,
        default: 0
    },
    end_date:{
        type: Date,
        default: ""
    }
},{
    timestamps: true
});

let session = mongoose.model('session', sessionSchema);

module.exports = session;