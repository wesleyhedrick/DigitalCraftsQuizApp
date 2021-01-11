const express = require('express');
const router = express.Router();

const {heroController} = require('../controllers');

router.get('/', heroController.hero)

module.exports = router;






