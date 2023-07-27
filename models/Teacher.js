const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    subjects: [
        {
          type: mongoose.Schema.Types.ObjectId,
           ref: 'Subject'
      }
    ],
    classroom: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    subjectname: {
        type: String,
        required: true
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

