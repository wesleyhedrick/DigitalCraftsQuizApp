const leaderboard = (req, res) => {res.send('leaderboard')}

const express = require('express');
const router = express.Router();

const {leaderboardController} = require('../controllers');

app.get('/leaderboard', async (req, res) => {
    db.collection('scores', 'userId' )
        .find()
        .sort({ score: -1 })
        .toArray(function(err, result) {
            if (err)
                res.send({ status: false, msg: 'failed to retrieve players' });
            console.log(Array.from(result));
            res.send({ status: true, msg: result });
        });
 });

module.exports = {
    leaderboard
}
