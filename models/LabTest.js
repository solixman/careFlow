import mongoose from "mongoose";

const LabTestSchema = new mongoose.Schema({
    labOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LabOrder",
        required: true
    },
    name: { type: String, required: true },
    safeRange: { type: String },
    result: { type: String }
}, { timestamps: true });

export default mongoose.model("LabTest", LabTestSchema);
    