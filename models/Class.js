const mongoose = require('mongoose');

const  classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;