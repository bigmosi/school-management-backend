const mongoose = require('mongoose');

const disciplinaryHistorySchema = new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });
  
  const studentSchema = new mongoose.Schema({
    disciplinaryHistory: [disciplinaryHistorySchema],
  });
  