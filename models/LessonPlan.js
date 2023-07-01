const mongoose = require('mongoose');

const lessonPlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Teacher',
        required: true
    },
});

const LessonPlan = mongoose.model('LessonPlan', lessonPlanSchema);

module.exports = LessonPlan;
