const jwt = require('jsonwebtoken');
require('dotenv').config(); // To access environment variables

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticateToken;
