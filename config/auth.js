const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Cashier = require('../models/cashier');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); 

const config = require('./configs');

exports.initPassport = (passport) => {
    passport.use(new LocalStrategy(Cashier.authenticate()));
    passport.serializeUser(Cashier.serializeUser());
    passport.deserializeUser(Cashier.deserializeUser());
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secretKey;
    passport.use(new JwtStrategy(opts,
        (jwt_payload, done) => {
            Cashier.findOne({_id: jwt_payload._id}, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                else if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            });
    }));
}

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 60 * 60 * 8});
};

exports.verifyUser = passport.authenticate('jwt', {session: false});