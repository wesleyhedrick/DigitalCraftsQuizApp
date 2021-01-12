<<<<<<< HEAD
const {Progress} = require('../models');

=======
>>>>>>> 68abba5431ba930b0f2e3b64815c7a66e480fa77
const saveProgress = async (req, res) => {
    //get all info from session
    //1. Score
    //2. What is left of the array of Question Ids
    //3. question Ids of missed Questions, coupled with which wrong answer they selected
    const score = req.session.score;
    const questionIds = req.session.questionIds;
<<<<<<< HEAD
    const missedQuestionsAndAnswers = req.session.incorrectAnswers;
    const user_id = req.session.user_id;
    console.log(missedQuestionsAndAnswers)
    //insert necessary information into database

    await Promise.all(
        missedQuestionsAndAnswers.map(async (item) => {
            return await Progress.create({
                Score: score,
                User_id: user_id,
                Missed_Question_Id: item.missedQuestionId,
                Player_Selection: item.wrongAnswer,
                Remaining_Questions: JSON.stringify(questionIds)
            });
        }));
   


=======
    
    //insert necessary information into database

    await 
>>>>>>> 68abba5431ba930b0f2e3b64815c7a66e480fa77
    //render the page that says progress saved
    // res.render('progress-saved')
    res.send('Your progress is saved.')
};

module.exports = {
    saveProgress
}
