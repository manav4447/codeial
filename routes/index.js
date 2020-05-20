const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controllers');
const passwordController = require('..//controllers/password_controller')
const resetController = require('../controllers/reset_controllers')
console.log('router loaded');


router.get('/', homeController.home);
router.get('/forgot', passwordController.forget);
router.post('/forgot', passwordController.resetLink);
router.get('/reset/:token', resetController.resetPassword);

router.post('/reset/:token', resetController.resetPassword2);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));

//tell about the apis 
 router.use('/api', require('./api'));




 

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

// router.get('/forgot-password', usersController.forget); 
module.exports = router;