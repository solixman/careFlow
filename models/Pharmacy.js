const  mongoose=require('mongoose');

const PharmacySchema = new mongoose.Schema({
    name: { type: String,
         required: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    openingHours: { type: String },
    status: { type: String, enum: ["active", "inactive"] } 
}, { timestamps: true });

module.exports= mongoose.model('Pharmacy',PharmacySchema);
