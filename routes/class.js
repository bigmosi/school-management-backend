const express = require("express");
const Class = require("../models/Class");
const Student = require('../models/Student');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const classes = await Class.find().populate('students');
        
        res.status(200).json(classes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.post('/', async (req, res) => {
    try {
      const { name, teacher, schedule, subject, studentIds } = req.body;
  
      const newClass = new Class({ name, teacher, schedule, subject, students: [] });
  
      // Find the students by their IDs and add them to the class
      const students = await Student.find({ _id: { $in: studentIds } }).exec();
      newClass.students = students.map((student) => student._id);
  
      await newClass.save();
      res.status(201).json(newClass);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
module.exports = router;
