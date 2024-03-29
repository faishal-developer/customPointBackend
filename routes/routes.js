const router = require('express').Router();
const userRoutes = require('./userRout');
const authroutes = require('./Auth.routes');
const ProductRoutes = require('./productRoute');
const categoryRoutes = require('./cat_routes');
const subCateRoutes = require('./subCateRoutes');
const ordersRoutes = require('./OrdersRoutes');
const {authenticate} = require('../middleWare/authenticate');

router.use('/api/v1/auth',authroutes);
router.use('/api/v1/profiles',userRoutes);
router.use('/api/v1/products',ProductRoutes);
router.use('/api/v1/categories',categoryRoutes);
router.use('/api/v1/subcategories',subCateRoutes);
router.use('/api/v1/orders',authenticate,ordersRoutes);

module.exports = router;