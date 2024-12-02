const sequelize = require('../config/connection');
const Schedule = require('../models/schedule');
const scheduleData = require('./scheduleData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    const schedules = await Schedule.bulkCreate(scheduleData, {
      returning: true,
    });
    console.log('Database seeded successfully with data:', schedules);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding the database:', err);
    process.exit(1);
  }
};

seedDatabase();
