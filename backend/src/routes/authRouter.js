const express = require('express');
const { registerController, signInController } = require('../controller/authController');
const router = express.Router();

// signUp
router.post('/signup', registerController);
router.post('/signin', signInController);

module.exports = router;