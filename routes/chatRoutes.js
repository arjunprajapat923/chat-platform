// routes/chatRoutes.js
const express = require('express');
const { matchUsers } = require('../controllers/chatController');

const router = express.Router();

// Define the route for user matching
router.post('/match', matchUsers);

module.exports = router;
