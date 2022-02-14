const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const cashierSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    shift: {
        type: String,
        required:true
    }
});

cashierSchema.plugin(passportLocalMongoose);

var cashier = mongoose.model('cashier', cashierSchema);

module.exports = cashier;