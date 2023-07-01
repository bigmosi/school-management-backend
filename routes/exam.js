const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ExamSchedule = require('../models/Exam');

router.post('/', async (req, res) => {
    const { examName, examDate, examTime, examDuration, additionalInfo } = req.body;

    try {
        const examSchedule = new ExamSchedule({
            examName,
            examDate,
            examTime,
            examDuration,
            additionalInfo
        });
     
        await examSchedule.save();

        res.status(201).json({ message: 'Exam schedule created successfully' });
    } catch (error) {
        console.error('Error creating exam schedule', error);
        res.status(500).json({ message: 'Failed to create exam schedule' });
    }
});

module.exports = router;

