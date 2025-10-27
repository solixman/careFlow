const PrescriptionItem = require('../models/PrescriptionItem');

module.exports = {

    async savePrescriptionItems(id, prescriptionItems) {

        try {
            let savedprescriptionItems = [];
            for (const item of prescriptionItems) {
                if (!item.medication || !item.dosage) continue;
                const prescriptionItem = new PrescriptionItem({
                    prescription: id,
                    medication: item.medication,
                    dosage: item.dosage,
                    duration: item.duration,
                    note: item.note
                });
                let savedPrescriptionItem = await prescriptionItem.save();
                savedprescriptionItems.push(savedPrescriptionItem);
            };
            console.log(savedprescriptionItems);

            return savedprescriptionItems;
        } catch (err) {
            throw err;
        }
    }
}