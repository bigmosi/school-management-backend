const express = require('express');
const LessonPlan = require('../models/LessonPlan');
const multer = require('multer');
const router = express.Router();

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
    .then(lessonPlans => {
        res.json(lessonPlans);
    }).catch(error => {
        res.status(500).json({ error: 'An error occured while trieving the lessons plan.'});
    })
});

module.exports = router;
