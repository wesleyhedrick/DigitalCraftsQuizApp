const express = require('express');
const router = express.Router();

const {leaderboardController} = require('../controllers');

router.get('/', leaderboardController.leaderboard)

module.exports = router


app.get('/leaderboard', async (req, res) => {
    // retrieve 'lim' from the query string info
    let { lim } = req.query;
    db.collection('scores', 'userId' )
        .find()
        .sort({ score: -1 })
        .limit(lim)
        .toArray(function(err, result) {
            if (err)
                res.send({ status: false, msg: 'failed to retrieve players' });
            console.log(Array.from(result));
            res.send({ status: true, msg: result });
        });
 });