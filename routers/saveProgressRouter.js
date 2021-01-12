const express = require('express');
const router = express.Router();
const {saveProgressController} = require('../controllers');

router.get('/', saveProgressController.saveProgress)

module.exports = router;
