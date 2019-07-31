const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.use(function (req, res, next) {
    let accesstoken = req.headers['accesstoken'] ||
        req.query.accesstoken ||
        req.body.accesstoken ||
        req.query.state.accesstoken || '';
    let DB = req.app.db;
    let secretTokenUSER = global.secretTokenUSER;

    if (typeof accesstoken !== 'string' || accesstoken === '' || accesstoken.length === 0) {
        return res.status(401).send({ message: 'Please Sigin In is incorrect !!!' });
    }
    jwt.verify(accesstoken, secretTokenUSER, (err, decoded) => {
        if (err)
            return res.status(403).send({ message: JSON.stringify(err) });
        let queryString = `
            SELECT email
            FROM USER 
            WHERE email = '${decoded['email']}'
            LIMIT 0,1
        `;

        DB.query(queryString, function (err, listUser) {
            if (err)
                return res.status(403).json({ message: JSON.stringify(err) });
            if (listUser.length === 0)
                return res.status(401).json({ message: 'Email not exists !!!' });
            req.dataUserLogin = listUser[0];
            return next();
        });
    });
});

router.use('/user-manager/', require('./user-manager'));

module.exports = router;