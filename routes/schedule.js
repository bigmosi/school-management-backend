const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const Subject = require('../models/Subject');

// GET all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('subject teacher');
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'An error occurred while fetching schedules.' });
  }
});

// POST create a new schedule
router.post('/', async (req, res) => {
    try {
      const { classId, day, startTime, endTime, subjectId, teacherId } = req.body;
  
      // Check if the required fields are provided
      if (!classId || !day || !startTime || !endTime || !subjectId || !teacherId) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }
  
      // Fetch the subject details from the database
      const subject = await Subject.findById(subjectId).populate('teacher');
  
      // Check if the subject exists
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found.' });
      }
  
      // Create a new schedule
      const schedule = new Schedule({
        classId,
        day,
        startTime,
        endTime,
        subject: subject._id,
        teacher: teacherId
      });
  
      await schedule.save();
      res.status(201).json(schedule);
    } catch (error) {
      console.error('Error creating schedule:', error);
      res.status(500).json({ error: 'An error occurred while creating the schedule.' });
    }
  });
  
// PUT update an existing schedule
router.put('/:id', async (req, res) => {
  try {
    const { classId, day, startTime, endTime, subjectId, teacherId } = req.body;

    // Check if the required fields are provided
    if (!classId || !day || !startTime || !endTime || !subjectId || !teacherId) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      {
        classId,
        day,
        startTime,
        endTime,
        subject: subjectId,
        teacher: teacherId
      },
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found.' });
    }

    res.json(schedule);
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ error: 'An error occurred while updating the schedule.' });
  }
});

// DELETE delete a schedule
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndRemove(req.params.id);

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found.' });
    }

    res.json({ message: 'Schedule deleted successfully.' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'An error occurred while deleting the schedule.' });
  }
});

module.exports = router;
