const userController = require('../controller/Profile_Cr');
const router = require('express').Router();
const {authenticate} = require('../middleWare/authenticate');

// get multiple user by search parameter
router.post('/',authenticate,userController.getMultipleUser);

// get single user by id
router.get('/:id',userController.singleUser);

// create user during registration
router.post('/create',userController.postUser);

router.delete('/:id',authenticate,userController.deleteUser);

// update users information
router.patch('/:id',authenticate,userController.updateUser)

module.exports = router;