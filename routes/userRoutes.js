const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
// desc: Regester user
// route: POST /api/users
// access: public
router.post('/', asyncHandler(async (req, res) => {
  // validate user information
  const {name, email, password} = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('User already exists')
  }
// create user
  const user = await User.create({
    name,
    email,
    password
  });
res.status(200).json({message: 'Register user'})
}))

// desc: Authenticate user/set token
// route: POST /api/users/auth
// access: public
router.post('/auth', asyncHandler(async (req, res) => {
  res.status(200).json({message: 'authenticate user'})
  }))
  
  
  // desc: Logout user
// route: POST /api/users/logout
// access: private
router.post('/logout', asyncHandler(async (req, res) => {
  res.status(200).json({message: 'logout user'})
  }))
  
  // desc: Get user profile
// route: GET /api/users/profile
// access: private
router.get('/profile', asyncHandler(async (req, res) => {
  res.status(200).json({message: 'user profile'})
  }))
  
  // desc: Update user profile
// route: PUT /api/users/profile
// access: private
router.put('/profile', asyncHandler(async (req, res) => {
  res.status(200).json({message: 'update user profile'})
  }))
  
module.exports = router;