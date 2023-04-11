const router = require('express').Router();
const userRoutes = require('./userRout');
const ProductRoutes = require('./productRoute');
const categoryRoutes = require('./cat_routes');
const subCateRoutes = require('./subCateRoutes');

router.use('/api/v1/users',userRoutes);
router.use('/api/v1/products',ProductRoutes);
router.use('/api/v1/categories',categoryRoutes);
router.use('/api/v1/sub-categories',subCateRoutes);

module.exports = router;