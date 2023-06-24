const express = require("express");
const Class = require("../models/Class");

const router = express.Router();

router.get('/', (req, res) => {
    try {
        const classes = Class.find().populate('students');
        
        res.status(200).json(classes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;
