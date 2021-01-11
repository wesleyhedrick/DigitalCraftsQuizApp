const express = require('express');
const router = express.Router();

const {
    questionSubmissionController

} = require('../controllers/index');

router.get('/', questionSubmissionController.questionSubmission)

module.exports = router