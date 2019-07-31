const router = require('express').Router();
router.use('/', require('./AUTHENTICATE'));
router.use('/user', require('./USER'));
module.exports = router;