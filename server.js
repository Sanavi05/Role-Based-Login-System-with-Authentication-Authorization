const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');  // Import the auth routes

// Initialize the environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Use the routes defined in authRoutes.js
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
