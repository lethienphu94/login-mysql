const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = (req, res) => {
    let dataForm = req.body;
    let DB = req.app.db;
    let dataUserLogin = {};
    function checkInPut() {
        return new Promise(function (resolve, reject) {
            if (global.validateEmail(dataForm['email']) == false)
                return res.status(401).json({ message: 'Email or Password is incorrect !!!' });
            if (global.validatePassword(dataForm['password']) == false)
                return res.status(401).json({ message: 'Email or Password is incorrect !!!' });
            return resolve();
        });
    }

    function checkEmailExist() {
        let queryString = `
            SELECT email, password
            FROM USER 
            WHERE email = '${dataForm['email']}'
            LIMIT 0,1
        `;
        return new Promise(function (resolve, reject) {
            DB.query(queryString, function (err, listUser) {
                if (err)
                    return res.status(403).json({ message: JSON.stringify(err) });
                if (listUser.length == 0)
                    return res.status(401).json({ message: 'Email or Password is incorrect !!!' });
                dataUserLogin = listUser[0];
                return resolve();
            });
        });
    }

    function checkPassword() {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(dataForm.password, dataUserLogin.password, function (err, resultPassword) {
                if (err)
                    return res.status(403).send({ success: false, message: 'The system failed to connect, please try again later' });
                if (resultPassword === false)
                    return res.status(403).send({ success: false, message: 'Email or password is incorrect !!!' });
                return resolve();
            });
        });
    }

    function createTokenUser() {
        let dataJson = {
            email: dataForm.email
        }
        let accesstoken = jwt.sign(dataJson, global.secretTokenUSER, {
            expiresIn: '7d',
            algorithm: 'HS256'
        });
        return res.status(200).send({ message: 'Sign In successfully!!!', accesstoken });
    }


    checkInPut()
        .then(checkEmailExist)
        .then(checkPassword)
        .then(createTokenUser);

};