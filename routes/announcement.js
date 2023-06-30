const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

router.get('/', async (req, res) => {
    try {
      const annoucements = await Announcement.find();
      const modifiedannoucements = annoucements.map(annoucement => {
        const {_id, ...annoucementData } = annoucement.toObject();
        return { id: _id, ...annoucementData };
      });
      res.json(modifiedannoucements);
    } catch (error) {
      console.error('Error getting annoucements:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

router.post('/', async (req, res) => {
    try {
        const { title, content } =  req.body;
        
        const announcement = new Announcement({
            title,
            content,
        });

        await announcement.save();
        res.status(201).json({ announcement: announcement, message: 'Announcement successfully created' });
    } catch (error) {
        console.error('Error creating announcement', error);
        res.status(500).json({ error: 'An error occured while creating the annoucement.' });
    }
});

module.exports = router;
