const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

// POST route to create a new administrator
// desc: Regester user
// route: POST /api/register/admin/auth
// access: public
router.post("/", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    // Check if the username already exists
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Hash the password before saving it to the database
    const hasedPassword = await bcrypt.hash(password, 10);

    // Create a new administrator
    const newAdmin = new Admin({
      username,
      email,
      password: hasedPassword,
      role,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Administrator created successfully" });
  } catch (error) {
    console.error("Error creating administrator:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// desc: Authenticate user/set token
// route: POST /api/register/admin/auth
// access: public
router.post("/auth", async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if the admin exists in the datase
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentails" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentails" });
    }
    // Generate a JSON Token (JWT)
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      secretKey,
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
