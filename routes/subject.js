const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');

router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        console.log('Error fetching subjects:', error);
        res.status(500).json({ error: 'An error occurred while fetching subjects.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found.' });
        }

        res.json(subject);
    } catch (error) {
        console.error({ error: 'Error fetching subject:', error});
        res.status(500).json({ error: 'An error occurred while fetching the subject.' });
    }
});

router.post('/', async (req, res) => {
    try {
      const { name, code, teacherId } = req.body;
  
      // Check if the teacherId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        return res.status(400).json({ error: 'Invalid teacherId' });
      }
  
      // Check if the teacher with the specified teacherId exists
      const teacherExists = await Teacher.exists({ _id: teacherId });
      if (!teacherExists) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      // Create a new subject with the provided data
      const subject = new Subject({ name, code, teacher: teacherId });
  
      // Save the subject to the database
      await subject.save();
  
      res.status(201).json({ subject, message: 'Subject created successfully.' });
    } catch (error) {
      console.error('Error creating subject:', error);
      res.status(500).json({ error: 'An error occurred while creating the subject.' });
    }
  });
  
router.put('/:id', async (req, res) => {
  try {
    const { name, code, teacher } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
        req.params.id,
        { name, code, teacher },
        { new: true }
    );

    if (!updatedSubject) {
        return res.status(404).json({ error: 'Subject not found.' });
    }

    res.json(updatedSubject);
  } catch (error) {
    console.error({ error: 'Error updating subject:', error });
    res.status(500).json({ error: 'An error occurred while updating the subject.' });
  }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteSubject = await Subject.findByIdAndDelete(req.params.id);

        if (!deleteSubject) {
            return res.status(404).json({ error: 'Subject not found.' });
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting subject', error);
        res.status(500).json({ error: 'An error occurred while deleting the subject.' });
    }
});

module.exports = router;
