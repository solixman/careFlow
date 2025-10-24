const { Schema, model } = require('mongoose');

const GENDERS = ['male', 'female'];
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const patientSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gender: {
        type: String,
        enum: GENDERS
    },
    insuranceInfo: {
        type: Schema.Types.ObjectId,
        ref: 'InsuranceInfo'
    },
    allergies: {
        type: [String],
        default: []
    },
    medicalHistory: {
        type: [String],
        default: []
    },
    bloodType: {
        type: String,
        enum: BLOOD_TYPES
    },
    height: { type: Number },
    weight: { type: Number },
    emergencyContact: {
        type: String,
        trim: true
    },

}, { timestamps: true });

module.exports = model('Patient', patientSchema);
