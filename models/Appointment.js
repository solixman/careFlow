const { Schema, model } = require('mongoose');

const APPOINTMENT_STATUS = ['waiting', 'confirmed', 'unconfirmed', 'in-progress', 'completed', 'cancelled'];

const appointmentSchema = new Schema(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
        },
        patientName: {
            type: String,
        },

        doctor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        scheduledBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        startTime: {
            type: Date,
            default: null
        },

        endTime: {
            type: Date,
            default: null
        },
        date: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: APPOINTMENT_STATUS,
            default: 'unconfirmed'
        },

        purpose: {
            type: String
        },

        isUrgent: {
            type: Boolean,
            default: false
        },

        note: {
            type: String
        }
    },
    { timestamps: true }
);

// optional: compound index to quickly query doctor’s queue
appointmentSchema.index({ doctor: 1, status: 1, queuePosition: 1 });

module.exports = model('Appointment', appointmentSchema);
