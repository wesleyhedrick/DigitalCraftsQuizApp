const saveProgress = async (req, res) => {
    //get all info from session
    //1. Score
    //2. What is left of the array of Question Ids
    //3. question Ids of missed Questions, coupled with which wrong answer they selected
    const score = req.session.score;
    const questionIds = req.session.questionIds;
    
    //insert necessary information into database

    await 
    //render the page that says progress saved
    res.render('progress-saved')
};


module.exports = {
    saveProgress
}
