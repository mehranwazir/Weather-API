// models/Weather.js

const mongoose = require('mongoose');

// Define the weather schema
const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    description: String,
    timestamp: { type: Date, default: Date.now}
});

// Create the weather model
const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
