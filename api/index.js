// import statements
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// middleware
const app = express();

// Middleware to parse JSON data
app.use(express.json());

if (process.env.NODE_ENV !== 'PRODUCTION') {
  // Load environment variables from .env file
  require('dotenv').config({ path: path.resolve(__dirname, 'config', '.env') });
}

// CORS middleware configuration
app.use(cors({ credentials: true, origin: '' }));


// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../app/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../app/dist/index.html"))
})

// Middleware to parse cookies
app.use(cookieParser());

// Import route handlers
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Set up routes
app.use('/user', userRoutes);
app.use('/post', postRoutes);

// Mongoose connection
mongoose.connect(process.env.DB).then(() => console.log("Database connected"))
  .catch(e => {
    console.error("Database connection error:", e);
    process.exit(1); // Exit the application on database connection error
  });

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
// Start the server
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // You may want to log this information or take other actions
});
