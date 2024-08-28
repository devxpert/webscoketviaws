const express = require('express');
const { login, register } = require('../controllers/authController');
const router = express.Router();

// Define routes for authentication
router.post('/login', login);
router.post('/register', register);

module.exports = router;