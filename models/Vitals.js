const {Schema,model} = require("mongoose");

const VitalsSchema = new Schema({
   consultation: {
        type: Schema.Types.ObjectId,
        ref: "Consultation"
    },
  bloodPressure: { type: String },
  heartRate: { type: Number },
  temperature: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  respiratoryRate: { type: Number },
  oxygenSaturation: { type: Number },
}, { timestamps: true });

module.exports=model("Vitals", VitalsSchema);
