const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');

// Route: GET /api/students
// Description: Get all students
router.get('/', async (req, res) => {
    try {
      const students = await Student.find();
      const modifiedStudents = students.map(student => {
        const {_id, ...studentData } = student.toObject();
        return { id: _id, ...studentData };
      });
      res.json(modifiedStudents);
    } catch (error) {
      console.error('Error getting students:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });


// Route: POST /api/students/:id/attendance
// Description: Add attendance for a student

router.get('/:id/attendance', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const attendanceData = student.attendance.map((attendance) => ({
      id: attendance._id,
      date: attendance.date,
      status: attendance.status,
    }));

    res.status(201).json(attendanceData);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route: GET /api/students/:id/acamdemic-performance
// Description: Get academic performance for a student

router.get('/:id/acamdemic-performance', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const academicData = student.academicPerformance.map((performance) => ({
      id: performance._id,
      subject: performance.subject,
      marks: performance.marks,
    }));

    
    res.status(201).json(academicData);
  } catch (error) {
    console.error('Error adding academic performance:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route: GET /api/students/:id/disciplinary-history
// Description: Get disciplinary history for a student

router.get('/:id/disciplinary-history', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const disciplinaryData = student.disciplinaryHistory.map((disciplinary) => ({
      id: disciplinary._id,
      date: disciplinary.date,
      description: disciplinary.description,
    }));

    
    res.status(201).json(disciplinaryData);
  } catch (error) {
    console.error('Error fetching disciplinary history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/disciplinary-history', async (req, res) => {
  try {
    const studentId = req.params.id;
    const { date, description } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.disciplinaryHistory.push({ date, description });
    await student.save();

    res.status(201).json({ message: 'Disciplinary record added successfully' });
  } catch (error) {
    console.error('Error adding disciplinary history:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route: POST /api/students
// Description: Create a new student
router.post('/', async (req, res) => {
  try {
    const newStudent = req.body;
    const student = await Student.create(newStudent);
    const {_id, ...studentData } = student.toObject();

    const modifiedStudents = { id: _id, ...studentData };
    res.status(201).json(modifiedStudents);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route: POST /api/students/:id/attendance
// Description: Add attendance for a student
router.post('/:id/attendance', async (req, res) => {
  try {
    const studentId = req.params.id;
    const { date, status } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const attendance = new Attendance({ student: studentId, date, status });
    await attendance.save();

    res.status(201).json({ message: 'Attendance added successfully' });
  } catch (error) {
    console.error('Error adding attendance:', error);
    res.status(500).json({ error: 'Server error' });
  }
});  


// Route: POST /api/students/:id/academic-performance
// Description: Add academic performance for a student

router.post('/:id/academic-performance', async (req, res) => {
  try {
    const studentId = req.params.id;
    const { subject, grade } = req.body;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    student.academicPerformance.push({ subject, grade });
    await student.save();
  } catch (error) {
    console.error('Error adding academic performance:', error);
    res.status(500).json({ error: 'Server error' });
  }
})

// Route: GET /api/students/:id
// Description: Get a student by ID

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Student ID is required' });
    }

    let student;

    if (id.length === 24) {
      student = await Student.findById(id);
    } else {
      student = await Student.findOne({ _id: id });
    }

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Replace _id with id in the response
    const { _id, ...studentData } = student.toJSON();
    studentData.id = _id;

    // Add a URL to the student's profile
    res.status(200).json(studentData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route: PUT /api/students/:id
// Description: Update a student by ID
router.put('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedStudentData = req.body;
    const student = await Student.findByIdAndUpdate(studentId, updatedStudentData, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route: DELETE /api/students/:id
// Description: Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
