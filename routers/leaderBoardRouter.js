const express = require('express');
const router = express.Router();

const {leaderboardController} = require('../controllers');

router.get('/', leaderBoardController.leaderBoard)

module.exports = router
