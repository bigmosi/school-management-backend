const express = require('express');
const router = express.Router();
const Question = require('../models/Queston');

// Route to create a new question
router.post('/', async (req, res) => {
  try {
    const { questionText, answerOptions } = req.body;

    const question = new Question({
      questionText,
      answerOptions,
    });

    const savedQuestion = await question.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create question' });
  }
});


// Route to get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get questions' });
  }
});


module.exports = router;
