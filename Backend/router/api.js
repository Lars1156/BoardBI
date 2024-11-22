const express = require('express');
const router = express.Router();

const userController  = require('../Controller/userController');

// user Api 
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/getUser'  , userController.getUser);
// router.get('/getDeveloper', userController.getAllDeveloper);
// router.get('/getIntern', userController.getAllIntren);

module.exports = router;