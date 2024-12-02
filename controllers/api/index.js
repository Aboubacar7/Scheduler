const router = require('express').Router();
const scheduleRoutes = require('./schedule');
const newscheduleRoutes = require('./new-schedule');

router.use('/schedules', scheduleRoutes);
router.use('/newschedule', newscheduleRoutes);

module.exports = router;