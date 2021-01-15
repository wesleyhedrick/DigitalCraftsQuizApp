const express = require('express');
const router = express.Router();

const {quizController} = require('../controllers')

router.get('/', quizController.quizSettings)
      .post('/', quizController.quizStart)
      .get('/question', quizController.quizQuestion) 
      .post('/question', quizController.questionFeedback)  
      .get('/quiz-feedback', quizController.quizFeedback)
      .get('/quiz-resume', quizController.quizResume)
module.exports = router
