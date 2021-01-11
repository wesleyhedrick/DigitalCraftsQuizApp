const express = require('express');
const router = express.Router();

const {signUpController} = require('../controllers');

router.get('/', signupController.registerUser)
      .post('/', signupController.createNewUser)
      .get('/user-exists', signupController.userNameExists)

module.exports = router;
