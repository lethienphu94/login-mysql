const mysql = require('mysql');
const configMySQL = require('./CONFIG/mysql');
const listNameTable = [
    'USER',
];
let dataConfigMySQL = {
    host: configMySQL.host,
    user: configMySQL.user,
    password: configMySQL.password,
};
let connectionMySQL = mysql.createConnection(dataConfigMySQL);

function createDataBase() {
    return new Promise((resolve, reject) => {
        connectionMySQL.connect(function (err) {
            if (err) 
                throw err;
            let queryString = "CREATE DATABASE IF NOT EXISTS " + configMySQL.database;
            connectionMySQL.query(queryString, function (errr, result) {
                if (errr) throw errr;
                connectionMySQL.end();
                return resolve();
            });    
        });
    });
}

function connectDataBase() {
    Object.assign(dataConfigMySQL, {
        connectionLimit: configMySQL.connectionLimit,
        debug: configMySQL.debug,
        database: configMySQL.database
    });
   
    var pool = mysql.createPool(dataConfigMySQL);
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err) {
            if (err) 
                throw err;
           return resolve(pool);
        });
    });
}

exports = module.exports =  async function (app) {
    await createDataBase();
    app.db = await connectDataBase();
    listNameTable.forEach(function (nameTable) {
        require('./MODEL/' + nameTable)(app);
    });
};
