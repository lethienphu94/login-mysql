module.exports = function (app, mongoose) {
    let queryString = `CREATE TABLE IF NOT EXISTS USER (
        id INT not null AUTO_INCREMENT,
        email  VARCHAR(255),
        password VARCHAR(255),
        PRIMARY KEY (Id) )`;
    app.db.query(queryString, function (err, results) {
        if (err) throw err;
    });
};