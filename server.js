const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection'); // Sequelize connection
const routes = require('./controllers'); // Import routes
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars with helper functions
const hbs = exphbs.create({
  helpers: {
    format_date: (date) => new Date(date).toLocaleDateString(),
  }, defaultLayout: 'main', // Set default layout
  layoutsDir: path.join(__dirname, 'views/layouts')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware for JSON parsing and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes
app.use(routes);
// Connect to the database and start the server
sequelize
  .sync({ force: false }) // Only use `force: true` if you want to drop and recreate tables
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });
