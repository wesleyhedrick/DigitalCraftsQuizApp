const express = require('express');
const router = express.Router();

const {confirmationController} = require('../controllers');

router.get('/', confirmationController.confirmation)

module.exports = router

