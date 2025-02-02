const express = require('express');
const authenticateJWT = require('../middleware/authMiddleware');
const { register, login, getAchievements } = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Protected route to fetch achievements (only accessible to Parents and Students)
router.get('/achievements', authenticateJWT, getAchievements);

module.exports = router;
