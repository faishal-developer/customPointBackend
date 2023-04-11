const router = require('express').Router();
const userRoutes = require('./userRout');
const ProductRoutes = require('./productRoute');
const categoryRoutes = require('./cat_routes');

router.use('/api/v1/users',userRoutes);
router.use('/api/v1/products',ProductRoutes);
router.use('/api/v1/categories',categoryRoutes);

module.exports = router;