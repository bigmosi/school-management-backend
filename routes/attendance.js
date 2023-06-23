const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const mongoose = require("mongoose");
const Student = require("../models/Student");
const ObjectId = mongoose.Types.ObjectId;


router.get('/', async (req, res) => {
    try {
        const attendance = await Attendance.find();
        const modifiedAttendance = attendance.map((attendance) => {
            const { _id, ...attendanceData } = attendance.toObject();
            return { id: _id, ...attendanceData };
        });
        res.json(modifiedAttendance);
    } catch (error) {
        console.error('Error getting attendance:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Add new attendance
router.post('/', async (req, res) => {
  try {
    const { student, date, status } = req.body;

    // Create a new attendance instance
    const attendance = new Attendance({
      student,
      date,
      status
    });

    // Save the attendance to the database
    await attendance.save();

    res.status(201).json({ message: 'Attendance added successfully' });
  } catch (error) {
    console.error('Error adding attendance:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/:id/attendance', async (req, res) => {
    try {
      const studentId = req.params.id;
      const student = await Student.findById(studentId);
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const attendanceData = await Attendance.find({ student: studentId })
        .populate('student', ['name', 'age', 'gender']) // Populate the 'student' field with selected fields
        .select('-__v'); // Exclude the '__v' field
  
      res.status(200).json(attendanceData);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// Update attendance by ID
router.put('/:id', async (req, res) => {
    try {
        const attendanceId = req.params.id;
        const updatedAttendanceData = req.body;

        const attendance = await Attendance.findByIdAndUpdate(
            attendanceId,
            updatedAttendanceData,
            { new: true, runValidators: true }
        );

        if (!attendance) {
            return res.status(404).json({ error: 'Attendance not found' });
        }

        const { _id, ...attendanceData } = attendance.toJSON();
        attendanceData.id = _id;

        res.json(attendanceData);
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const attendanceId = req.params.id;
        const attendance = await Student.findByIdAndDelete(attendanceId);
        if (!attendance) {
            return res.status(404).json({ error: 'Attendance not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
