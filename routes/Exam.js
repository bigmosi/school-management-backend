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
router.post('/submit', async (req, res) => {
  const { examId, userAnswers } = req.body;

  console.log('Exam ID:', examId);

  try {
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Update the exam with user answers
    exam.userAnswers = userAnswers;
    await exam.save();

    res.status(200).json({ message: 'Exam submitted successfully' });
  } catch (error) {
    console.error('Error submitting exam:', error);
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

module.exports = router;
