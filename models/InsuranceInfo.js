const { Schema,
    model } = require('mongoose');

const insuranceSchema = new Schema({
    provider: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: String,
        required: true,
    },
    coverageType: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },

},
    { timestamps: true });

module.exports = model('InsuranceInfo',insuranceSchema);
