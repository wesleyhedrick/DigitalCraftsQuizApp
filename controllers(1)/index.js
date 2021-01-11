const { questionSubmissionRouter } = require('../routers');

module.exports = {
    confirmationController: require('./confirmation'),
    heroController: require('./hero'),
    leaderBoardController: require('./leaderboard'),
    quizController: require('./quiz'),
    questionSubmissionController: require('./questionSub')
    
};