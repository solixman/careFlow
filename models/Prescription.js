import mongoose from "mongoose";


const status = ["draft", "signed", "sent", "dispensed"];
const PrescriptionSchema = new mongoose.Schema({
    consultation: { type: mongoose.Schema.Types.ObjectId, ref: "Consultation", required: true }, // consultation: Consultation
    status: {
        type: String,
        enum: status
    },
    pharmacy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pharmacy"
    } 
}, { timestamps: true });

export default mongoose.model("Prescription", PrescriptionSchema);
