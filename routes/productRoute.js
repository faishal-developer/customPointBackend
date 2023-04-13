const router = require('express').Router();
const { authenticate } = require('../middleWare/authenticate');
const productController = require('../controller/Product_cr');

// create a single product
router.post('/create',authenticate ,productController.createProduct);

// get a single product
router.get('/:id',productController.getSingleProduct);

//get multiple product
router.post('/', productController.getMultiple);

// update single product
router.patch('/:id',authenticate,productController.updateOne);

// delet single product
router.delete('/:id',authenticate,productController.deleteOne);

module.exports = router;