const express = require('express');
const router = express.Router();

const {signUpController} = require('../controllers');

router.get('/', signUpController.signUpForm)
      .post('/', signUpController.createNewUser)
      .get('/user-exists', signUpController.userNameExists)

module.exports = router;
