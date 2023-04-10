const router = require('express').Router();
const userRoutes = require('./userRout');

router.use('/api/v1/users',userRoutes);

module.exports = router;