const router = require('express').Router();

router
    .route('/profile')
    .get(require('./profile'));

module.exports = router;