const {Questions} = require('../models')
const {shuffle, createArrayOfAnswers, layout} = require('../utils')

const quizSettings = async (req, res) => {
    const questionIds = await Questions.findAll({
        attributes: [
            'id'
        ], 
    })

    req.session.questionIds = [];
    req.session.quizLength = questionIds.length;      
    req.session.incorrectAnswers = []
    req.session.score = 0;
    req.session.questionNum = 1;

    questionIds
        .forEach(item => req.session.questionIds.push(item.dataValues.id));
    
    req.session.questionIds = shuffle(req.session.questionIds);
    
    res.redirect('quiz/question')
}

const quizQuestion = async (req, res) => {
    const last = req.session.questionIds.length - 1;    
    questionObject = await Questions.findOne({
        where: {
            id: req.session.questionIds[last]
        }
    });

    req.session.thisQuestionId = req.session.questionIds.pop();
    req.session.questionObject = questionObject;
    let answers = createArrayOfAnswers(questionObject);
    let question = questionObject.Question;
    req.session.correctAnswer = questionObject.Correct_Answer;
    let questionNum = req.session.questionNum;
    let score = req.session.score;

    console.log(last, questionObject, req.session.thisQuestionId, 
        answers, question,req.session.correctAnswer, questionNum,score);
    res.render('quiz-question', {
        locals: {
            question, 
            answers, 
            questionNum, 
            score
        }, 
        ...layout
    })
    // res.send('Quiz Questions')
}

const questionFeedback = async (req, res) => {
    const playerAnswer = req.body.answer;
    const correctAnswer = req.session.correctAnswer;
    let next;
    let ruling;
    let wrongAnswer;

    //INCREMENT QUESTION NUM
    req.session.questionNum += 1;
    questionObject = req.session.questionObject
    
    //Determine which wrong answer the player chose. This is so that
    //progress can be saved an incorrect answers pulled up again from
    //the database.
    
    //EVALUATE ANSWER. ADJUST SCORE. SELECT THE APPROPRIATE PARTIALS FILE
    if(playerAnswer === correctAnswer){
        req.session.score +=1
        ruling = '/partials/correct'
    } else {
        for (k in questionObject) {
            if(questionObject[k]===playerAnswer){
                wrongAnswer = k;
            }
        }
        missedQuestionId = req.session.thisQuestionId;
        req.session.incorrectAnswers.push({missedQuestionId, wrongAnswer});
        ruling = '/partials/incorrect'
    }


    //DECIDE IF ITS THE LAST QUESTION. AND RENDER THE APPROPRIATE PAGE
    //IF LAST, NEXT = GO-TO-END
    if(req.session.questionIds.length === 0){
        next = '/partials/go-to-end';
    } else {
        next = '/partials/next-question'
    }

    //RENDER QUESTION FEEDBACK PAGE
    res.render('question-feedback', {
        locals: {
            playerAnswer,
            correctAnswer
        },
        partials: {
            ruling,
            next, 
        }
    });
}

const quizFeedback = (req, res) => {res.render('quiz-feedback')}

module.exports = {
    quizSettings,
    quizQuestion,
    questionFeedback,
    quizFeedback
}
