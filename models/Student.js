const mongoose = require('mongoose');

// Define the student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    contactNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  emergencyContacts: [
    {
      name: String,
      relationship: String,
      contactNumber: String,
    },
  ],
  attendance: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attendance',
    },
  ],
  academicPerformance: [
    {
      subject: {
        type: String,
        required: true,
      },
      marks: {
        type: Number,
        required: true,
      },
    },
  ],
  disciplinaryHistory: [{
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }
  ],
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student',
  }
});

studentSchema.pre('find', function (next) {
  this.populate('attendance');
  next();
});

studentSchema.pre('findOne', function (next) {
  this.populate('attendance');
  next();
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
