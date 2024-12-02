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
    format_date: (date) => new Date(date).toLocaleDateString(), // Helper for date formatting
  },
  defaultLayout: 'main', // Set default layout
  layoutsDir: path.join(__dirname, 'views/layouts'), // Ensure layout directory is properly set
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Ensure views directory is properly set

// Middleware for JSON parsing and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes
app.use(routes);

// Root route to handle 404 errors and provide a base response
app.get('/', (req, res) => {
  res.render('home', { title: 'Welcome to Scheduler App' }); // Ensure you have a 'home.handlebars' file
});

// 404 Error Handling Middleware for unmatched routes
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' }); // Ensure you have a '404.handlebars' file
});

// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Internal Server Error' }); // Ensure you have a '500.handlebars' file
});

// Connect to the database and start the server
sequelize
  .sync({ force: false }) // Use force: true cautiously (only for development)
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
    process.exit(1); // Exit the process if database connection fails
  });
