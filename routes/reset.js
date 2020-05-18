
const express = require('express');

const router = express.Router();

const resetController = require('../controllers/password_controller');

router.get('/forgot', resetController.reset);
module.exports = router;