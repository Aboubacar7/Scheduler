const router = require('express').Router();
const sequelize = require('../config/connection');
const Schedule = require('../models/schedule');

router.get('/', async (req, res) => {
    try {
     
      const [schedules, metadata] = await sequelize.query('SELECT * FROM schedule');
  
      console.log('Raw schedules:', schedules); 
  
     
      res.render('all', { schedules });
    } catch (err) {
      console.error('Error executing raw query:', err);
      res.status(500).json(err);
    }
  });

  // router.get('/edit/:id', async (req, res) => {
  //   try {
      
  //     const scheduleData = await Schedule.findByPk(req.params.id);
  
  //     if (!scheduleData) {
  //       res.status(404).json({ message: 'No schedule found with this id!' });
  //       return;
  //     }
  
  //     const schedule = scheduleData.get({ plain: true });
  
  //     res.render('edit-schedule', { schedule });
  //   } catch (err) {
  //     console.error('Error retrieving schedule:', err);
  //     res.status(500).json(err);
  //   }
  // });

  

module.exports = router;
