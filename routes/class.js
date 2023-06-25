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

  router.put('/:id', async (req, res) => {
    try {
      const classId = req.params.id;
      const { name, teacher, schedule, subject, studentIds } = req.body;
  
      const updatedClass = await Class.findOneAndUpdate(
        { _id: classId },
        { name, teacher, schedule, subject, studentIds },
        { new: true }
      );
  
      if (!updatedClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      res.status(200).json(updatedClass);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });  
  
  
  router.delete('/:id', async (req, res) => {
    try {
      const classId = req.params.id;
  
      const deleteClass = await Class.findByIdAndDelete(classId);
  
      if (!deleteClass) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      res.json({ message: 'Class deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
module.exports = router;
