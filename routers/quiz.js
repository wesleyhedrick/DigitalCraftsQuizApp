const express = require('express');
const router = express.Router();


const {
    quizController
} = require('../index')

router.get('/', quizController.quizSettings);

router.get('/question', quizController.quizQuestion);

router.get('/feedback', quizController.questionFeedback);

router.get('/quiz-feedback', quizController.quizFeedBack)




module.export = router