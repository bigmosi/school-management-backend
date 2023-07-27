const express = require('express');
const router = express.Router();
const multer = require('multer');
const Teacher = require('../models/Teacher');

router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'An error occurred while fetching teachers.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found.' });
    }

    res.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ error: 'An error occurred while fetching the teacher.' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where uploaded files should be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename for the stored file
  },
});

// Create multer instance with storage configuration
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, email, classroom, gender, about, age, subjectname } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      throw new Error('No file uploaded');
    }

    const teacher = new Teacher({
      name,
      email,
      gender,
      classroom,
      image: imageFile.filename,
      about,
      age,
      subjectname
    });

    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).json({ error: 'An error occurred while creating the teacher.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: 'Teacher not found.' });
    }

    res.json(updatedTeacher);
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).json({ error: 'An error occurred while updating the teacher.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!deletedTeacher) {
      return res.status(404).json({ error: 'Teacher not found.' });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).json({ error: 'An error occurred while deleting the teacher.' });
  }
});

module.exports = router;
