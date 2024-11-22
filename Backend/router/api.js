const express = require('express');
const router = express.Router();

const userController  = require('../Controller/userController');
const projectController = require('../Controller/projectCotroller');
const authenticate = require('../middleware/auth');

// user Api 
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/getUser'  , userController.getUser);
// router.get('/getDeveloper', userController.getAllDeveloper);
// router.get('/getIntern', userController.getAllIntren);

// Project Router animationPlayState: 
router.post('/create' , authenticate , projectController.createProject);

module.exports = router;