import mongoose from "mongoose";

const PrescriptionItemSchema = new mongoose.Schema({
    prescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription",
        required: true
    },
    medication: { type: String, required: true },
    dosage: { type: String },
    frequency: { type: String },
    duration: { type: String },
    renewing: { type: String },
    note: { type: String }
}, { timestamps: true });

export default mongoose.model("PrescriptionItem", PrescriptionItemSchema);
