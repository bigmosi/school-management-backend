const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// POST route to create a new administrator
router.post('/', async (req, res) => {
    try {
        const { username, password, role } = req.body;

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
            password: hasedPassword,
            role
        });

        await newAdmin.save();

        res.status(201).json({ message: 'Administrator created successfully' });
    } catch (error) {
        console.error('Error creating administrator:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
