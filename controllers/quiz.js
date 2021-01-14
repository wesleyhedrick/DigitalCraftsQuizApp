const {Questions} = require('../models')
const {shuffle, createArrayOfAnswers, layout} = require('../utils')

const quizSettings = async (req, res) => {
    res.render('quiz-settings', {
        locals: {
            categories: [
                {id: 1, category_title: 'Command Line'},
                {id: 2, category_title: 'CSS'},
                {id: 3, category_title: 'Databases'},
                {id: 4, category_title: 'DOM Manipulation'},
                {id: 5, category_title: 'Express'},
                {id: 6, category_title: 'HTML'},
                {id: 7, category_title: 'JavaScript'},
                {id: 8, category_title: 'Node'},
                {id: 9, category_title: 'Python'},
                {id: 10, category_title: 'React'},
                {id: 11, category_title: 'Redux'},
                {id: 12, category_title: 'Other'},
                {id: 13, category_title: 'All the things'}
            ], 
            types: [
                {id: 2, type: 'Multiple Choice'},
                {id: 1, type: 'Flash Cards'},
                {id: 3, type: 'True/False'},
            ]
        }
    
    })
    
}

const quizStart = (req, res) => {
    res.render('quiz-start');
}



const quizQuestion = async (req, res) => {
    const last = req.session.questionIds.length - 1;    
    console.log('Question Ids length', last);
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
    let quizLength = req.session.quizLength
    
    
    res.render('main-quiz', {
        locals: {
            question, 
            answers, 
            questionNum, 
            score,
            quizLength
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
        ruling = 'Correct!'
    } else {
        
        for (k in questionObject) {
            if(questionObject[k]===playerAnswer){
                wrongAnswer = k;
            }
        missedQuestionId = req.session.thisQuestionId;
        req.session.incorrectAnswers.push({missedQuestionId, wrongAnswer});
        ruling = 'Incorrect :('
        }

    }

    //DECIDE IF ITS THE LAST QUESTION. AND RENDER THE APPROPRIATE PAGE
    //IF LAST, NEXT = GO-TO-END
    if(req.session.questionIds.length === 0){
        next = 'partials/go-to-end';
        saveAndQuit = 'partials/nothing'
    } else {
        next = 'partials/next-question';
        saveAndQuit = 'partials/save-and-quit';
    }
    
    //RENDER QUESTION FEEDBACK PAGE
    res.render('question-feedback', {
        locals: {
            playerAnswer,
            correctAnswer, 
            ruling
        },
        partials: {
            next,
            saveAndQuit

        }
    });
}

const quizFeedback = (req, res) => {res.render('quiz-feedback')}

module.exports = {
    quizSettings,
    quizQuestion,
    quizStart,
    questionFeedback,
    quizFeedback
}
