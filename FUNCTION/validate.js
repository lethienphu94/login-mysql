exports = module.exports =  function () { 
    global.validateEmail = email => {
        if (typeof email !== 'string')
            return false;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }


    global.validatePassword = password => {
        if (typeof password !== 'string')
            return false;
        var re = /[a-zA-Z0-9]{6,20}$/;
        return re.test(password);
    }
}