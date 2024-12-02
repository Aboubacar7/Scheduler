const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Schedule } = require('../../models');

router.get('/', async (req, res) => {
  try {
    res.render('new-schedule');
        
  } catch (err) {
    console.error('Error executing raw query:', err);
    res.status(500).json(err);
  }
});
router.post('/', async (req, res) => {
    try {
      console.log('Request Body:', req.body);
  
      const scheduleData = await Schedule.create({
        title: req.body.title,
        description: req.body.description,
        username: req.body.username,
      });
  
      console.log('New Schedule Created:', scheduleData);
  
      // Redirect back to a relevant page after success
      res.status(201).redirect('/dashboard'); // Redirect to dashboard or relevant page
    } catch (err) {
      console.error('Error creating schedule:', err);
      res.status(500).render('error', { error: 'Failed to create schedule.' }); // Render error page or send JSON
    }
  });

module.exports = router;