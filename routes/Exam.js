const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');

// Route to create a new exam
router.post('/', async (req, res) => {
  try {
    const { examName, questionIds } = req.body;

    const exam = new Exam({
      examName,
      questions: questionIds,
    });

    const savedExam = await exam.save();

    res.status(201).json(savedExam);
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ error: 'Failed to create exam' });
  }
});

// Submit an exam
rrouter.post('/:examId/submit', async (req, res) => {
  const { examId } = req.params;
  const { userAnswers } = req.body;

  try {
    // Retrieve the exam from the database based on the examId
    const exam = await Exam.findById(examId);

    // Update the userAnswers for the exam
    exam.userAnswers = userAnswers;

    // Save the updated exam with userAnswers
    await exam.save();

    // You can perform further processing or grading of the exam here
    // and send an appropriate response based on your requirements

    // Send a success response
    res.json({ message: 'Exam submitted successfully' });
  } catch (error) {
    console.error('Error submitting exam', error);
    res.status(500).json({ error: 'Failed to submit exam' });
  }
});

// Route to get all exams
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find().populate('questions');
    res.json(exams);
  } catch (error) {
    console.error('Error getting exams:', error);
    res.status(500).json({ error: 'Failed to get exams' });
  }
});

// GET route to fetch the exam data based on examId
router.get('/exams/:examId', async (req, res) => {
  const { examId } = req.params;

  try {
    // Retrieve the exam from the database based on the examId
    const exam = await Exam.findById(examId).populate('questions');

    // Send the exam data as JSON response
    res.json(exam);
  } catch (error) {
    console.error('Error fetching exam', error);
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
});

module.exports = router;
