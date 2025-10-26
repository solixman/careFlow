const Prescription = require('../models/Prescription.js');
const prescriptionItemService = require('../services/prescriptionItemService');
const Pharmacy = require('../models/Pharmacy');
const Consultation = require('../models/Consultation.js');

module.exports = {


    async create(id, { pharmacyId, prescriptionItems }) {

        try {
            console.log(id);
            if (!await Pharmacy.exists({ _id: pharmacyId })) {
                throw new Error('Invalid pharmacy ID');
            }
            if (!await Consultation.exists({ _id: id })) {
                throw new Error('Invalid consultation ID');
            }
            let prescription = new Prescription()
            prescription.consultation = id;
            prescription.status = "draft";
            prescription.pharmacy = pharmacyId
            prescription = await prescription.save();

            let savedPrescriptionItems = await prescriptionItemService.savePrescriptionItems(prescription._id, prescriptionItems)
            console.log(savedPrescriptionItems);
            return { prescription, savedPrescriptionItems };

        } catch (err) {
            throw err
        }
    }
}