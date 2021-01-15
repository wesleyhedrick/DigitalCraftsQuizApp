const {Progress} = require('../models');

const saveProgress = async (req, res) => {
    //get all info from session
    //1. Score
    //2. What is left of the array of Question Ids
    //3. question Ids of missed Questions, coupled with which wrong answer they selected
    const score = req.session.score;
    const questionIds = req.session.questionIds;
    const missedQuestionsAndAnswers = req.session.incorrectAnswers;
    const user_id = req.session.user_id;
    console.log(missedQuestionsAndAnswers)
    //insert necessary information into database

    await Promise.all(
        missedQuestionsAndAnswers.map(async (item) => {
            return await Progress.create({
                Score: score,
                Missed_Question_Id: item.missedQuestionId,
                Player_Selection: item.wrongAnswer,
                Remaining_Question_Ids: JSON.stringify(questionIds),
                User_Id: user_id,
                Quiz_Length: req.session.quizLength,
                Question_Num: req.session.questionNum
            });
        }));
   
    //render the page that says progress saved
    res.render('progress-saved')
    
};

module.exports = {
    saveProgress
}
