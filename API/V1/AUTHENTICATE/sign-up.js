
const bcrypt = require('bcrypt');
module.exports = (req, res) => {
    let dataForm = req.body;
    let DB = req.app.db;
    function checkInPut() {
        return new Promise(function (resolve, reject) {
            if (global.validateEmail(dataForm['email']) == false)
                return res.status(401).json({ message: 'Incorrect email format !!!' });
            if (global.validatePassword(dataForm['password']) == false)
                return res.status(401).json({ message: 'Password is 6 to 20 characters long, and no special characters !!!' });
            if (dataForm['password'] !== dataForm['passwordConfirm'])
                return res.status(403).json({ message: 'Confirm password is incorrect !!!' });
            return resolve();
        });
    }

    function checkEmailExist() {
        let queryString = `
            SELECT email 
            FROM USER 
            WHERE email = '${dataForm['email']}'
            LIMIT 0,1
        `;
        return new Promise(function (resolve, reject) {
            DB.query(queryString, function (err, listUser) {
                if (err)
                    return res.status(403).json({ message: JSON.stringify(err) });
                if (listUser.length > 0)
                    return res.status(401).json({ message: 'Email already exists, please register new email !!!' });
                return resolve();
            });
        });
    }

    function passwordEncryption() {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(dataForm['password'], 8, function (err, hash) {
                if (err)
                    return res.status(403).json({ message: JSON.stringify(err) });
                dataForm['password'] = hash;
                return resolve();
            });
        });
    }

    function createUser() {
        let queryString = `
            INSERT INTO USER  (email, password) 
            VALUES ('${dataForm['email']}', '${dataForm['password']}');
            `;
        DB.query(queryString, function (err, result) {
            if (err)
                return res.status(403).json({ message: JSON.stringify(err) });
            
            return res.status(200).json({ message: 'User sign up successful !!!' }); 
        });
    }

    checkInPut()
        .then(checkEmailExist)
        .then(passwordEncryption)
        .then(createUser);

};