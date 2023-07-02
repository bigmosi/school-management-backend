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
      res.status(500).json({ error: 'Failed to create exam' });
    }
  });

// Route to get all exams
router.get('/', async (req, res) => {
    try {
      const exams = await Exam.find().populate('questions');
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get exams' });
    }
  });
  