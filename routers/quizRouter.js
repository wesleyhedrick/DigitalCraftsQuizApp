const express = require('express');
const router = express.Router();

const {quizController} = require('../controllers')

router.get('/', quizController.quizSettings)
      .get('/question', quizController.quizQuestion) 
      .get('/feedback', quizController.questionFeedback)  
      .get('/quiz-feedback', quizController.quizFeedback)
module.exports = router
