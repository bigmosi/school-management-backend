const express = require('express');
const LessonPlan = require('../models/LessonPlan');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'lessonplan-' + uniqueSuffix + '.pdf');
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed.'));
    }
  },
});

router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const app = express();

app.use('/api/lesson-plans', router);

router.post('/', upload.single('file'), (req, res) => {
  // Handle the file upload and other lesson plan data

  const lessonPlan = {
    title: req.body.title,
    description: req.body.description,
    file: req.file.path,
    teacher: req.body.teacher,
  };

  LessonPlan.create(lessonPlan)
    .then(savedLessonPlan => {
      res.json(savedLessonPlan);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while creating the lesson plan.' });
    });
});

router.get('/:teacherId', (req, res) => {
  const teacherId = req.params.teacherId;

  // Retrieve all the lesson plans for the specified teacher from the database
  LessonPlan.find({ teacher: teacherId })
    .populate('teacher')
    .then(lessonPlans => {
      res.json(lessonPlans);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while retrieving the lesson plans.' });
    });
});

router.get('/', (req, res) => {
  LessonPlan.find()
    .populate('teacher')
    .then(lessonPlans => {
      res.json(lessonPlans);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while retrieving the lesson plans.' });
    });
});

module.exports = router;
