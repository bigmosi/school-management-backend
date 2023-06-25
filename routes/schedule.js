const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');


router.get('/', async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ error: 'An error occured while fetching schedules.' });
    }
});

router.get('/:id', async (req, res) => {
   try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
        return res.status(404).json({ error: 'Schedule not found.' });
    }

    res.json(schedule);
   } catch (error) {
     console.error('Error fetching schedule');
     res.status(500).json({ error: 'An error occured while fetching the schema.' });
   }
});

router.post('/', async (req, res) => {
    try {
        const { classId, day, startTime, endTime, subject, teacher } = req.body;
        const schedule = new Schedule({ classId, day, startTime, endTime, subject, teacher });
        await schedule.save();
        res.status(201).json(schedule);
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ error: 'An error occured while creating schedule.'});
    }
});

router.put('/:id', async (req, res) => {
   try {
    const { classId, day, startTime, endTime, subject, teacher} = req.body;
    const updatedSchedule = await Schedule.findByIdAndUpdate(
        req.params.id,
        { classId, day, startTime, endTime, subject, teacher },
        { new: true }
    );

    if (!updatedSchedule) {
        return res.status(404).json({ error: 'Schedule not found.' });
    }
    res.json(updatedSchedule);
   } catch (error) {
     console.error('Error updating schedule:', error);
     res.status(500).json({ error: 'Error occured while updating schedule.' });
   }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteSchedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!deleteSchedule) {
            return res.status(404).json({ error: 'Schedule not found.' });
        }
    } catch (error) {
        console.log('Error deleting schedule:', error);
        res.status(500).json({ error: 'An error occurred while deleting schedule.' });
    }
});

module.exports = router;
