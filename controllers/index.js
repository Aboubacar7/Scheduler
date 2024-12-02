const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardroutes = require('./dashboard')

router.use('/dashboard', dashboardroutes);
router.use('/api', apiRoutes);

module.exports = router ;