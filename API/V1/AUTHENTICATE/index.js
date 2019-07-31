const router = require('express').Router();
router
   .route('/sign-up')
   .post(require('./sign-up'));

router
   .route('/sign-in')
   .post(require('./sign-in'));


module.exports = router;