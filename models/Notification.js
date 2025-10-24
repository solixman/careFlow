const { Schema, model } = require('mongoose');

const NOTIFICATION_TYPES = ['reminder', 'account', 'info'];

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    type: {
        type: String,
        enum: NOTIFICATION_TYPES,
        default: 'info'
    },

    subject: {
        type: String,
    },

    message: {
        type: String,
    },

    isSeen: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

module.exports = model('Notification', notificationSchema);
