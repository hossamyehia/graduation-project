const Session = require('../models/sessions');

let openSessions = {};

/**
 * get all Sessions
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
const getAll = () => {
    return new Promise((resolve, reject) => {
        Session.find({}).sort({ended: 1}).then((S) => {
            resolve(S);
        }).catch(err => reject(err));
    })
}

/**
 * get all Sessions
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
 const getOpen = () => {
    return new Promise((resolve, reject) => {
        Session.find({ended: false}).sort({ended: 1}).then((S) => {
            resolve(S);
        }).catch(err => reject(err));
    });
}

/**
 * Create Callable Function
 * 
 * @param {*} gateway_id 
 * @param {*} cashier_id 
 * @returns Callable Function
 */
const timeoutFunc = function (gateway_id,cashier_id) {
    
    function start(){
        closeSession(gateway_id,cashier_id)
    }

    return start;
}

/**
 * Add New Session
 * 
 * @param {String} gateway_id 
 * @param {String} cashier_id 
 */
const add = (gateway_id,cashier_id) => {
    return new Promise((resolve, reject) => {

        let date = new Date(Date.now() + (1000 * 60 * 60 * 8) ).toString()
        Session.insertMany({ gateway_id: gateway_id, cashier_id: cashier_id, ended: false, end_date: date}).then((session) => {
            let start = timeoutFunc(gateway_id,cashier_id);
            let sessionEnds = setTimeout(start, (1000 * 60 * 60 * 8));
            openSessions[session._id] = sessionEnds;
            resolve();
        }).catch(err => reject(err));
        
    });
}

/**
 * Close New Session
 * 
 * @param {String} gateway_id 
 * @param {String} cashier_id 
 */
const close = (gateway_id, cashier_id) => {
    return new Promise((resolve, reject) => {
        let date = new Date().toString()
        Session.updateOne({gateway_id: gateway_id, cashier_id: cashier_id, ended: false},{ $set: { end_date : date, ended: true} }).then( session =>{
            if(openSessions[session._id]){
                clearTimeout(openSessions[session._id]);
                delete openSessions[session._id];
            }
            resolve("done");
        }).catch(err => reject(err));
    });
}


module.exports = {
    getAll,
    getOpen,
    add,
    close
}