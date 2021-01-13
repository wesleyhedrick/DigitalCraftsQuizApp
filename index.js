
// require('dotenv').config();
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
const es6Renderer = require('express-es6-template-engine');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();
const logger = morgan('dev');
const hostname = '127.0.0.1';


const {
    heroRouter,
    loginRouter,
    signUpRouter,
    quizRouter,
    confirmationRouter,
    questionSubmissionRouter,
    leaderboardRouter, 
    saveProgressRouter
} = require('./routers')



//Register Middleware
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());

app.use(session({
    store: new FileStore(),  // no options for now
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');
const server = http.createServer(app);



app.use('/question-submit', questionSubmissionRouter);
app.use('/', heroRouter);
app.use('/login', loginRouter)
app.use('/sign-up', signUpRouter)
app.use('/quiz', quizRouter);
app.use('/leaderboard', leaderboardRouter);
app.use('/confirmation', confirmationRouter);
app.use('/save-progress', saveProgressRouter);




app.get('/leaderboard', async (req, res) => {
   
    db.collection('score', 'User_Id' )
        .find()
        .sort({ score: -1 })
        .toArray(function(err, result) {
            if (err)
                res.send({ status: false, msg: 'failed to retrieve players' });
            console.log(Array.from(result));
            res.send({ status: true, msg: result });
        });
 });


//Error Handling for Bad Routes
app.get('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});
const PORT = 3000;

server.listen(PORT, hostname, () => {
    console.log(`Server running at localhost, port ${PORT}`);
});

