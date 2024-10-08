const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config(); // To access environment variables

const expiresIn = 86.4;

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.user_id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Register a new user
exports.register = async (req, res) => {
  const { username, password,email, phone_number, your_city, course_taken, progress_percentage } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password_hash: hashedPassword,
      email,
      phone_number,
      your_city,
      course_taken,
      progress_percentage
    });

    // Generate token
    const token = generateToken(newUser);

    return res.status(201).json({
      message: 'User registered successfully',
      user_id: newUser.user_id,
      token,
      expiresIn
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Login user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate token
    const token = generateToken(user);

    return res.status(200).json({
      message: 'Login successful',
      user_id: user.user_id,
      token,
      expiresIn
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
