const router = require('express').Router();
const orderController = require('../controller/OrderController');

//create a order
router.post('/', orderController.createOrder)

//get a order
router.get('/:id',orderController.getSingle);

//get multiple orders
router.post('/multiple', orderController.getMultipleData)

//Update Single orders
router.patch('/:id',orderController.updateSingleOrder)

module.exports = router;