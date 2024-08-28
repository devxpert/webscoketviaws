const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes'); // Import routes

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static('public'));

// Use routes
app.use('/api/auth',authRoutes );

module.exports = app;
