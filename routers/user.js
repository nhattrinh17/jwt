const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const middlewareControler = require('../controllers/middlewareController')

// Delete User
router.delete('/delete/:id', middlewareControler.veriflyTokenAndAdminAuth, userController.deleteUser)

// Get User All
router.get('/', middlewareControler.veriflyToken, userController.getAllUser)

module.exports = router