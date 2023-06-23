const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
        contactNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
    address: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    placeOfBirth: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
    },
    religion: {
        type: String,
        enum: ['Christianity', 'Islam', 'Hinduism', 'Buddhism', 'Judaism', 'other'],
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    behaviour: {
        type: String,
        enum: ['Mild', 'Normal', 'Hyperactive'],
        required: true,
    },
    illness: {
        type: String,
        required: true,
    },
});

const Admission = mongoose.model("Admission", admissionSchema);

module.exports = Admission;
