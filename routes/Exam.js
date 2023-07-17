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
router.post('/:examId/submit', async (req, res) => {
  const { examId } = req.params;
  const { userName, userAnswers } = req.body;

  try {
    // Retrieve the exam from the database based on the examId
    const exam = await Exam.findById(examId).populate('questions');

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Check if the number of user answers matches the number of questions
    if (userAnswers.length !== exam.questions.length) {
      return res.status(400).json({ message: 'Invalid number of answers' });
    }

    // Update the userName and userAnswers for the exam
    exam.userName = userName;
    exam.userAnswers = userAnswers;
    exam.score = score;
    

    // Save the updated exam with userName and userAnswers
    await exam.save();

    // You can perform further processing or grading of the exam here
    // and send an appropriate response based on your requirements
    const totalQuestions = exam.questions.length;
    let score = 0;

    // Compare userAnswers with the correct answers and calculate the score
    for (let i = 0; i < totalQuestions; i++) {
      const userAnswer = userAnswers[i];
      const correctAnswer = exam.questions[i].correctAnswer;

      if (userAnswer === correctAnswer) {
        score++;
      }
    }

    // Generate an appropriate response based on the score
    let responseMessage = '';
    if (score === totalQuestions) {
      responseMessage = 'Congratulations! You scored full marks.';
    } else if (score >= totalQuestions / 2) {
      responseMessage = 'You passed the exam.';
    } else {
      responseMessage = 'You did not pass the exam.';
    }

    // Send a success response
    res.json({ message: 'Exam submitted successfully', score, responseMessage });
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
router.get('/:examId', async (req, res) => {
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

router.get('/:examId/user-answers', async (req, res) => {
  const { examId } = req.params;

  try {
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Retrieve the userAnswers field from the exam
    const { userAnswers } = exam;

    res.json(userAnswers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
