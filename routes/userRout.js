const userController = require('../controller/user_Cr');
const router = require('express').Router();
const {authenticate} = require('../middleWare/authenticate');
// get multiple user by search parameter
router.post('/',()=>{
    
})

// get single user by id
router.get('/:id',userController.singleUser);

// create user during registration
router.post('/create',userController.postUser);

// delete user and user related information
router.delete('/:id',()=>{});

// update users information
router.patch('/id',()=>{})

module.exports = router;