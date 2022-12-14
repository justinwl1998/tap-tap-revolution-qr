const router = require('express').Router();

const userRoutes = require('./userRoutes');
const scoreRoutes = require('./scoreRoutes');

router.use('/users', userRoutes);
router.use('/score', scoreRoutes);

module.exports = router;