const express = require('express')
const router = express.Router();

const usersController = require('../controllers/users_controller.js');

router.get('/profile', usersController.profile);
//router.get('/login' , require('./login'));

/* router.get('/sign-up', usersController.signup );
router.get('/sign-in', usersController.signIn); */
module.exports = router;
