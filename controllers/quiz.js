const {
    Users, 
    Questions, 
    Category, 
    Question_Types, 
    Leaderboard, 
    Progress} = require('../models')
const {
    shuffle, 
    createArrayOfAnswers, 
    layout, 
    setUpSession, 
    getMissedQandA,
    updateLeaderboard
} = require('../utils')


const quizSettings = async (req, res) => {
    
    const categoryObjectDB = await Category.findAll({
        attributes: ['id', 'category_title']
    })
    
    const typesObjectDB = await Question_Types.findAll({
        attributes: ['id','Type']
    })
    
    const categories = categoryObjectDB.map(item => item.dataValues)
    const types = typesObjectDB.map(item => item.dataValues)
    categories.push({id:13, category_title: 'All the things'});
    
    console.log(categories)
    console.log(types);
    // res.json(categoryObjectDB)
    // return
    
    res.render('quiz-settings', {
        locals: {
            categories, 
            types
        }, 
        partials: {
            header: '/partials/header'
        }
    })
}

const quizResume = async (req, res) => {
    //QUERY DB FOR ALL RECORDS WITH USER ID
    const savedQuizData = await Progress.findAll({
        where: {
            User_Id: req.session.user_id
        }
    })    
    
    const remainingQuestionIds = JSON.parse(savedQuizData[0].dataValues.Remaining_Question_Ids);
    const quizLength = parseInt(savedQuizData[0].dataValues.Quiz_Length);
    let questionSpacer = - quizLength - remainingQuestionIds.length;
    questionSpacer = Array.from({length: questionSpacer}, (_,i) => i="a");
    questionIds = [...questionSpacer, ...remainingQuestionIds]
    req.session.questionNum = savedQuizData[0].dataValues.Question_Num;
    req.session.questionIds = questionIds
    req.session.score = savedQuizData[0].dataValues.Score;
    req.session.quizLength = quizLength;
    
    // res.json(savedQuizData);
    // return
    res.redirect('/quiz/question')
}


const quizStart = async (req, res) => {
    //Get form data from req.body
    const length = req.body.length; 
    const category = parseInt(req.body.category);
    const type = parseInt(req.body.type);
    console.log(typeof category)
    // Query the database for these quizzes
    
    let questionIds = await Questions.findAll({
        attributes: ['id']
        // where: {
        //     [Op.and]: [
        //            {Category_ID: category}, 
        //            {Question_Type_Id: type}
        //        ]
        // }
    });

    //Shuffle the array of Question Ids and then choose ${length} items
    questionIds = shuffle(questionIds)
                    .splice(0, length);
    
    //Set up the session
    setUpSession(length, questionIds,req);
    
    res.render('quiz-start');
}



const quizQuestion = async (req, res) => {
    let length = req.session.questionIds.length;
    console.log('Question Ids length', length);
    req.session.questionIds = req.session.questionIds.filter(item => item != "a");

    questionObject = await Questions.findOne({
        where: {
            id: req.session.questionIds.pop()
        }
    });
    
    req.session.thisQuestionId = questionObject.id
    req.session.questionObject = questionObject;
    let answers = createArrayOfAnswers(questionObject);
    let question = questionObject.Question;
    req.session.correctAnswer = questionObject.Correct_Answer;
    let questionNum = req.session.questionNum;
    let score = req.session.score;
    let quizLength = req.session.quizLength
    
    // res.json(questionObject);
    // return
    
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
    // res.send("You answered a question");
    // return
    const playerAnswer = req.body.answer;
    const correctAnswer = req.session.correctAnswer;
    let next;
    let ruling;
    let wrongAnswer;
    let questionsRemaining = req.session.questionIds.length;
    
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
        }

        missedQuestionId = req.session.thisQuestionId;
        req.session.incorrectAnswers.push({missedQuestionId, wrongAnswer});
        ruling = 'Incorrect :('

    }

    //DECIDE IF ITS THE LAST QUESTION. AND RENDER THE APPROPRIATE PAGE
    //IF LAST, NEXT = GO-TO-END
    console.log('quiz length', req.session.length)
    if(questionsRemaining === 0){
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

const quizFeedback = async (req, res) => {
    //Loop through req.session.incorrectAnswers and make a new array of just the ids
    const missedQuestionIdsFromSession = req.session.incorrectAnswers.map(item => item.missedQuestionId);
    
    //Get data from session and store it in usable variables for locals object
    const score = Math.round((req.session.score/req.session.quizLength)*100);

    //Query DB based on the items in the incorrectAnswers object in sessions
    const missedQandAFromDB = await Questions.findAll({
        where: {
            id: missedQuestionIdsFromSession
        }
    })

    //Update Leaderboard, adding player's score to leaderboard score or creating leaderboard
    //record if one does not exist.    
    updateLeaderboard(req, Users, Leaderboard);

    //Prepare array of objects comprising missed questions, their answers, and the 
    //player selection
    const mQAforTemplate = getMissedQandA(req, missedQandAFromDB);
    const missedQandALabels = ['Question', 'Answer', 'You picked']
    // res.json(missed_Questions_And_Answers_For_Template);
    // return

    res.render('quiz-feedback',
    {
        locals: {
            mQAforTemplate,
            missedQandALabels,
            score, 
            
        }
    }
    )
}

module.exports = {
    quizSettings,
    quizQuestion,
    quizStart,
    questionFeedback,
    quizFeedback, 
    quizResume
}
