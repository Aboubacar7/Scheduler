const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if running on Heroku with CLEARDB_DATABASE_URL
if (process.env.CLEARDB_DATABASE_URL) {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Disable strict SSL validation if needed
      },
    },
    logging: false, // Optional: Disable SQL query logging
  });
} else {
  // Local development configuration
  sequelize = new Sequelize(
    process.env.DB_NAME, // 'schedule'
    process.env.DB_USER, // 'root'
    process.env.DB_PASSWORD, // 'password'
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306,
      logging: false, // Optional: Disable SQL query logging
    }
  );
}

module.exports = sequelize;


