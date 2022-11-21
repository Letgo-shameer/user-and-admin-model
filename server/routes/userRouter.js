const express = require('express');
const userController = require('../controller/userController')


//route init
const router = express.Router();

//routes
router.get('/', userController.isLoggedOut, userController.userLanding)

router.get('/user/login', userController.isLoggedOut, userController.userLoginPage)

router.get('/user/signup', userController.isLoggedOut, userController.userSignupPage)

router.get('/user/home', userController.isLoggedIn, userController.userHome)


//post
router.post('/user/signup', userController.userSignup)

router.post('/user/login', userController.userLogin)

router.post('/user/logout', userController.userLogout)

module.exports = router