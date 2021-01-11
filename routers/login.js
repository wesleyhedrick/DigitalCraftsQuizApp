const express = require('express');
const router = express.Router();

const {loginController} = require('../controllers');

router.get('/', loginController.loginLanding)

module.exports = router
