const layout = {
    partials: {
        header: '/partials/header',
        footer: '/partials/footer'
    }

};

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  function createArrayOfAnswers(object){
    let answersArray = [];
    console.log("this function is running")
    console.log(object)
    for (key in object.dataValues){
        console.log(key)
        if(key.indexOf('nswer')>-1){
            console.log(object[key]);
            answersArray.push(object[key]);
        }
    }

    answersArray = shuffle(answersArray)
    return answersArray;

}   

function setUpSession(length, questionIds, req){
    req.session.questionIds = [];
    questionIds
        .forEach(item => req.session.questionIds
        .push(item.id));
    req.session.quizLength = length;
    req.session.incorrectAnswers = [];
    req.session.score = 0;
    req.session.questionNum = 1;
}

function getMissedQandA(req, missedQandAFromDB){
    let newObject = {};
    let missed_Questions_And_Answers_For_Template = [];

    req.session.incorrectAnswers.forEach((item, indx) =>{
        newObject.question = missedQandAFromDB[indx]['Question'];
        newObject.answer = missedQandAFromDB[indx]['Correct_Answer'];
        newObject.playerSelection = missedQandAFromDB[indx][item.wrongAnswer];
        newObjectCopy = {...newObject};
        missed_Questions_And_Answers_For_Template.push(newObjectCopy)
    }); 
    return missed_Questions_And_Answers_For_Template
}
module.exports = {
    layout, 
    shuffle,
    createArrayOfAnswers,
    setUpSession, 
    getMissedQandA
};