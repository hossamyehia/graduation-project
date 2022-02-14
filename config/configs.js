const username = process.env.USER;
const password = process.env.PASSWORD;
const clusterUrl = process.env.DBHOST;
const DB =process.env.DB;

const authMechanism = "DEFAULT";

const DBSTRING = "mongodb://127.0.0.1:27017/Hypermarket?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.1.9"
const MONGOURI = `mongodb+srv://${username}:${password}@${clusterUrl}/${DB}?retryWrites=true&w=majority`;

module.exports = {
    'secretKey': process.env.SECRETKEY,
    'mongoUri' : MONGOURI,
}
