const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const middlewareControler = require('../controllers/middlewareController')

// Register
router.post('/register', authController.reristerUser);

// Login
router.post('/login', authController.loginUser);

// RefresToken
router.post('/refresh', authController.requestRefreshToken)

// Log out
router.post('/logout', middlewareControler.veriflyToken, authController.userLogout);

module.exports = router;
