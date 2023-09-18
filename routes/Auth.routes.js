const authController=require('../controller/Auth_cr');
const router = require('express').Router();

// get multiple user by search parameter
router.post('/signup',authController.signUp);

// get single user by id
router.post('/login',authController.login);

// create user during registration
router.get('/refreash-token',authController.SendAccessToken);


module.exports = router;