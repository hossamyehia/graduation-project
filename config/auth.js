const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Cashier = require('../models/cashier');
const User = require('../models/user');

const jwt = require('jsonwebtoken'); 

const config = require('./configs');

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.initPassport = (passport) => {
    /**
     * Cashier Auth
     */
    passport.use("local-Cashier",new LocalStrategy(Cashier.authenticate()));
    passport.serializeUser(Cashier.serializeUser());
    passport.deserializeUser(Cashier.deserializeUser());
    
    passport.use("jwt-Cashier", new JwtStrategy(opts,
        (jwt_payload, done) => {
            Cashier.findOne({_id: jwt_payload._id},{hash:0, salt:0}).then((user) => { 
                if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            }).catch(err => { return done(err, false) });
    }));

    passport.use("local-User", new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    passport.use("jwt-User",new JwtStrategy(opts,
        (jwt_payload, done) => {
            User.findOne({_id: jwt_payload._id},{hash:0, salt:0}).then((user) => { 
                if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            }).catch(err => { return done(err, false) });
    }));
}

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 60 * 60 * 8});
};

exports.verifyCashier = passport.authenticate("jwt-Cashier", {session: false});
exports.verifyUser = passport.authenticate("jwt-User", {session: false});