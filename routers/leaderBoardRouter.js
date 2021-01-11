const express = require('express');
const router = express.Router();

const {leaderboardController} = require('../controllers');

router.get('/', leaderboardController.leaderboard)

module.exports = router
