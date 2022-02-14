const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require('./services/db.js');
const {initPassportLocal, initPassport} = require('./config/auth');

connectDB();
initPassport(passport);

let indexRouter = require('./routes/index');
let cashierRouter = require('./routes/cashier');
let gatewayRouter = require('./routes/payGate');
let vCartRouter = require('./routes/vCart');
let cartRouter = require('./routes/cart');
let productRouter = require('./routes/product');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/cashier', cashierRouter);
app.use('/gateway', gatewayRouter);
app.use('/cart',cartRouter);
app.use('/vcart',vCartRouter);
app.use('/product',productRouter);


module.exports = app;
