const subCatController = require('../controller/SubCat_cr');
const router = require('express').Router();
const {authenticate} = require('../middleWare/authenticate');

//create a sub category
console.log(authenticate,subCatController.createSubCat);
router.post('/',authenticate,subCatController.createSubCat);

//get a single subcategory
router.get('/:id',subCatController.getSingle);

//get multiple subcategory by id
router.post('/multiple',subCatController.getMultiple)

//update a single subcategory;
router.patch('/:id',authenticate,subCatController.updateOne);

//delete a single subcategory;
router.delete('/:id',authenticate,subCatController.deleteOne);

module.exports = router;