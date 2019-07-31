module.exports = (req, res) => {
    let dataUserLogin = req.dataUserLogin;
    let DB = req.app.db;
    let queryString = `
            SELECT email
            FROM USER 
            WHERE email = '${dataUserLogin['email']}'
            LIMIT 0,1
        `;

    DB.query(queryString, function (err, listUser) {
        if (err)
            return res.status(403).json({ message: JSON.stringify(err) });
        if (listUser.length === 0)
            return res.status(401).json({ message: 'Email not exists !!!' });
        return res.status(200).json({ data: listUser[0] });
    });
};