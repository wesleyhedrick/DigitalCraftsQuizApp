const {Questions} = require('../models');
const questionSubmission = (req, res) => res.render('question-submit');
const submissionFeedback = async (req, res) => {
        //Get info from req.body
        const Question = req.body.question;
        const Correct_Answer = req.body.correctAnswer;
        const Wrong_Answer_1 = req.body.wrongAnswer1;
        const Wrong_Answer_2 = req.body.wrongAnswer2;
        const Wrong_Answer_3 = req.body.wrongAnswer3;
        const Category_ID = req.body.category;

        //Insert session info into the DB
        await Questions.create({
            Question,
            Correct_Answer,
            Wrong_Answer_1,
            Wrong_Answer_2,
            Wrong_Answer_3, 
            Submitted: true, 
            Category_ID
        })
        
        res.render('submission-feedback')
}

module.exports = {
    questionSubmission, 
    submissionFeedback
}

