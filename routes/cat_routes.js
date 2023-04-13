const router = require('express').Router();
const { authenticate } = require('../middleWare/authenticate');
const categoryController = require('../controller/Category_cr');

// get multiple user by search parameter
router.post('/',categoryController.getMultiple );

// get single user by id
router.get('/:id', authenticate,categoryController.getSingleCategory);

// create user during registration
router.post('/create',authenticate,categoryController.createCategory);

router.delete('/:id', authenticate,categoryController.deleteSingleCat );

// update users information
router.patch('/:id', authenticate,categoryController.updateCategory);

module.exports = router;