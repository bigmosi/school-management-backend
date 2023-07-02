const mongoose = require('mongoose');

const examScheduleSchema = new mongoose.Schema({
    examName: {
        type: String,
        required: true
    },
    examDate: {
        type: Date,
        required: true,
    },
    examTime: {
        type: String,
        required: true,
    },
    examDuration: {
        type: Number,
        required: true
    },
    additionalInfo: String,
  });

const Exam = mongoose.model('Exam', examScheduleSchema);

module.exports = Exam;
