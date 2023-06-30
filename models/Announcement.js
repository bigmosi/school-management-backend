const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now    
    },
    expiresAt: {
        type: Date
    }
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
