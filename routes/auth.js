const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate a random secret key
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex'); // Generates a 32-byte (256-bit) key
  };
  
  const secretKey = generateSecretKey();
  console.log('Secret Key:', secretKey);

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      // If the user does not exist, return an error
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      // If the password is invalid, return an error
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, {
        expiresIn: '1h' // Set the token expiry time
      });
  
      // Set the token as a HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: true // Set to true if using HTTPS
      });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Logout user
router.post('/logout', (req, res) => {
    // Clear the token from the client's browser
    res.clearCookie('token');
    
    
    res.status(200).json({ message: 'Logout successful' });
  });
  

module.exports = router;
