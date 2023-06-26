const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        console.log('Error fetching subjects:', error);
        res.status(500).json({ error: 'An error occurred while fetching subjects.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found.' });
        }

        res.json(subject);
    } catch (error) {
        console.error({ error: 'Error fetching subject:', error});
        res.status(500).json({ error: 'An error occurred while fetching the subject.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, code, teacher } = req.body;
        const subject = new Subject( { name, code, teacher });

        await subject.save();
        res.status(201).json({ subject: subject, message: 'Subject created successfully.' });
    } catch (error) {
        console.error({ error: 'Error creating subject.', error});
        res.status(500).json({ error: 'An error occurred while creating subject. '});
    }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, code, teacher } = req.body;
    const updatedSubject = await Subject.findByIdAndUpdate(
        req.params.id,
        { name, code, teacher },
        { new: true }
    );

    if (!updatedSubject) {
        return res.status(404).json({ error: 'Subject not found.' });
    }

    res.json(updatedSubject);
  } catch (error) {
    console.error({ error: 'Error updating subject:', error });
    res.status(500).json({ error: 'An error occurred while updating the subject.' });
  }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteSubject = await Subject.findByIdAndDelete(req.params.id);

        if (!deleteSubject) {
            return res.status(404).json({ error: 'Subject not found.' });
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting subject', error);
        res.status(500).json({ error: 'An error occurred while deleting the subject.' });
    }
});

module.exports = router;
