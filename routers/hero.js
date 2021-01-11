const express = require('express')
const router = express.Router();
const {
    heroController
} = require ('../controllers/hero')

router.get('/', heroController.heroLanding)

module.exports = router