const express = require('express');
const router = express.Router();

const postsController= require('../controllers/posts_controllers')//import the controller to get the action

router.post('/create', postsController.create);


module.exports = router;