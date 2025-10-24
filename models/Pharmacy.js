import mongoose from "mongoose";

const PharmacySchema = new mongoose.Schema({
    name: { type: String,
         required: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    openingHours: { type: String },
    status: { type: String, enum: ["active", "inactive"] } 
}, { timestamps: true });

export default mongoose.model("Pharmacy", PharmacySchema);
