
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const weatherRoutes = require('./routes/weatherRoutes');
const dbConfig = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database
dbConfig();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the weather routes
app.use('', weatherRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
