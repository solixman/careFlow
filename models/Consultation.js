const {Schema,model} = require("mongoose");

const ConsultationSchema = new Schema({
    appointment: {
        type: Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    date: { type: Date },
    note: { type: String },
    diagnosis: { type: String },
    procedures: [{ type: String }],
    files:{type:[String]},
}, { timestamps: true });

module.exports=model('Consultation',ConsultationSchema)