const express = require('express');
const router = express.Router();
const Question = require('../models/Queston');

// Route to create a new question
router.post('/', async (req, res) => {
    try {
      const { questionText, answerOptions } = req.body;
  
      // Validate the input
      if (!questionText || !answerOptions || !Array.isArray(answerOptions) || answerOptions.length === 0) {
        return res.status(400).json({ error: 'Invalid question data' });
      }
  
      const question = new Question({
        questionText,
        answerOptions,
      });
  
      const savedQuestion = await question.save();
  
      res.status(201).json(savedQuestion);
    } catch (error) {
      console.error('Error creating question', error);
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
