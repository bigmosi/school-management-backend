const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const protect = require("../utils/authMiddleware");
// desc: Regester user
// route: POST /api/users
// access: public
router.post(
  "/",
  asyncHandler(async (req, res) => {
    // validate user information
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }
    // create user
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);

      throw new Error("Invalid user data");
    }

    res.status(200).json({ message: "Register user" });
  })
);

// desc: Authenticate user/set token
// route: POST /api/users/auth
// access: public
router.post(
  "/auth",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);

      throw new Error("Invalid email or password");
    }
    res.status(200).json({ message: "authenticate user" });
  })
);

// desc: Logout user
// route: POST /api/users/logout
// access: private
router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "user loggedout" });
  })
);

// desc: Get user profile
// route: GET /api/users/profile
// access: private
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    res.status(200).json({ message: "user profile" });
  })
);

// desc: Update user profile
// route: PUT /api/users/profile
// access: private
router.put(
  "/profile",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404);
    }
    res.status(200).json({ message: "update user profile" });
  })
);

module.exports = router;
