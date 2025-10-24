import mongoose from "mongoose";

const LabOrderSchema = new mongoose.Schema({
  consultation: { type: mongoose.Schema.Types.ObjectId,
     ref: "Consultation", 
     required: true },
  date: { type: Date },      
  status: { 
    type: String,
    enum: ["ordered", "received", "validated"] 
  },
  note: { type: String },    
  labTests: [{ type: mongoose.Schema.Types.ObjectId, ref: "LabTest" }] // labTests: list<LabTest>
}, { timestamps: true });

export default mongoose.model("LabOrder", LabOrderSchema);
