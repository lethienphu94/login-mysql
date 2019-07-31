const express = require('express');
const bodyParser = require('body-parser');
const configServer = require('./CONFIG/server');
global.secretTokenUSER = configServer.secretTokenUSER;
const app = express();


app.use(bodyParser.json({ limit: '5mb', parameterLimit: 50 }));
// app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 100 }));

require('./models')(app);

require('./FUNCTION/validate')();

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, AccessToken, Target');
    res.header('Access-Control-Expose-Headers', 'Content-Type, AccessToken, Target');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/api/v1', require('./API/V1'));
app.use('/api/v1/test', (req, res) => {
    return res.status(400).json({ message: 'test' });
});




var server = require('http').createServer(app);
server.listen(configServer.port, function () {

    var host = server.address().address
    var port = server.address().port
    var protocol = server.isUsingSSL === true ? 'https' : 'http';

    console.log("Example app listening at %s://%s:%s", protocol, host, port);
});