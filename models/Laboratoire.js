import mongoose from "mongoose";

const LaboratoireSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    openingHours: { type: String },
    status: {
        type: String,
        enum: ["open", "closed", "under_maintenance"],
        default: "open"
    }
}, { timestamps: true });

export default mongoose.model("Laboratoire", LaboratoireSchema);
