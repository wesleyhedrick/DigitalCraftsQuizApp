const express = require('express');
const router = express.Router();

const {questionSubmissionController} = require('../controllers');

router.get('/', questionSubmissionController.questionSubmission)
      .post('/', questionSubmissionController.submissionFeedback);

module.exports = router
