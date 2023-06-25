const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers', error);
        res.status(500).json({ error: 'An error occured while fetchig teachers.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found.' });
        }

        res.json(teacher);
    } catch (error) {
        console.error('Error fetching teacher:', error);
        res.status(500).json({ error: 'An error occured while fetching the teacher.' });
    }
});

router.post('/', async (req, post) => {
    try {
        const { name, email } = req.body;

        const teacher = new Teacher({ name, email });

        await new teacher.save();
        res.status(201).json(teacher);
    } catch (error) {
        console.error('Error creating teacher', error);
        res.status(500).json({ error: 'An error occured while creating teacher.' });
    }
});

router.put('/:id', async (req, res) => {
   try {
    const { name, email } = req.body;

    const updatedTeacher = await Teacher.findByIdAndUpdate(
        req.params.id,
        { name, email },
        { new: true }
    );
    if (!updatedTeacher) {
        return res.status(404).json({ error: 'Teacher not found.' });
    }
    res.status(updatedTeacher);
   } catch (error) {
     console.error('Error updating teacher:', error);
     res.status(500).json({ error: 'An error occured while updating the teacher.' });
   }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteTeacher = await Teacher.findByIdAndDelete(req.params.id);

        if (!deleteTeacher) {
            return res.status(404).json({ error: 'Teacher not found.'})
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ error: 'An error occured while deleting the teacher.' });
    }
});

module.exports = router
