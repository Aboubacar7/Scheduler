const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Schedule } = require('../../models');

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

router.put('/:id', async (req, res) => {
  try {
    const scheduleId = req.params.id;

    // Ensure the required fields exist
    if (!scheduleId || !req.body.title || !req.body.description || !req.body.username) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Perform the update
    const [updatedRows] = await Schedule.update(
      {
        title: req.body.title,
        description: req.body.description,
        username: req.body.username,
      },
      {
        where: { id: scheduleId },
      }
    );

    // Check if the schedule was updated
    if (!updatedRows) {
      return res.status(404).json({ message: 'No schedule found with this ID!' });
    }

    res.status(200).json({ message: 'Schedule updated successfully!' });
  } catch (err) {
    console.error('Error updating schedule:', err);
    res.status(500).json({ error: 'Failed to update the schedule.' });
  }
});
router.post('/', async (req, res) => {
  try {
    const newSchedule = await Schedule.create({
      title: req.body.title,
      description: req.body.description,
      username: req.body.username,
    });
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error('Error creating schedule:', err);
    res.status(500).json({ error: 'Failed to create schedule.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const scheduleId = req.params.id;

    // Attempt to delete the schedule
    const deletedSchedule = await Schedule.destroy({
      where: { id: scheduleId },
    });

    if (!deletedSchedule) {
      return res.status(404).json({ message: 'No schedule found with this ID!' });
    }

    res.status(200).json({ message: 'Schedule deleted successfully!' });
  } catch (err) {
    console.error('Error deleting schedule:', err);
    res.status(500).json({ error: 'Failed to delete schedule.' });
  }
});

module.exports = router;
