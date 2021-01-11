const express = require('express');
const router = express.Router();

const {heroController} = require('../controllers');

router.get('/', (req, res) => res.send('hero'))

module.exports = router;






