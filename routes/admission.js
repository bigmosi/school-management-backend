const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Student = require("../models/Student");

// Create an admission
router.post('/', async (req, res) => {
    try {
        const newAdmission = req.body;
        const admission = await Student.create(newAdmission);
        const {_id, ...admissionData } = admission.toObject();

        const modifiedStudents = { id: _id, ...admissionData };
        res.status(201).json(modifiedStudents);
    } catch (error) {
        console.error('Error creating admission', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get all admissions
router.get('/', async (req, res) => {
    try {
        const admissions = await Admission.find({});
        res.status(200).json(admissions);
    } catch (error) {
        console.error('Error fetching admissions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get admission by ID
router.get('/:id', async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);
        if (!admission) {
            return res.status(404).json({ error: 'Admission not found' });
        }

        res.status(200).json(admission);
    } catch (error) {
        console.error('Error fetching admission', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update admission by ID
router.put('/:id', async (req, res) => {
    try {
        const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!admission) {
            return res.status(404).json({ error: 'Admission not found' });
        }

        res.status(200).json(admission);
    } catch (error) {
        console.error('Error updating admission:', error);
        res.status(500).json({ error: 'Server error'});
    }
});

// Delete admission by ID
router.delete('/:id', async (req, res) => {
    try {
        const admission = await Admission.findByIdAndDelete(req.params.id);

        if(!admission) {
            return res.status(404).json({ error: 'Admission not found' });
        }
        res.json({ message: 'Admission deleted successfully' });
    } catch (error) {
        console.error('Error deleting admission:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
