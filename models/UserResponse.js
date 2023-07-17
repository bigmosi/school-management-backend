const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  responses: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedAnswer: { type: String },
    isCorrect: { type: Boolean },
  }],
  score: { type: Number },
});

module.exports = mongoose.model('UserResponse', userResponseSchema);
