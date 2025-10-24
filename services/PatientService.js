const User = require('../models/User');
const Patient = require('../models/Patient');


module.exports = {

    async create(user) {

        try {

            if (!user || !user._id) {
                throw new Error('something went wrong please try again later');
            }

            const existingPatient = await Patient.findOne({ userId: user._id });
            if (existingPatient) {
                throw new Error('A patient already exists for this user');
            }
            const patient = await Patient.create({
                userId: user._id,
            })
            console.log('patient created succefully');

        } catch (err) {
            console.error(err);
            throw err;
        }
    },


    async getOneByUserId(id) {

        try {

            let patient = Patient.findOne({ userId: id });
            if (!patient) throw new Error("something went wrong, thos user doesn't have a patient");
            return patient;

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async update(id, patientData) {
        try {
           return updatedPatient = await Patient.findOneAndUpdate({ userId: id },
                { $set: patientData },
                { new: true, runValidators: true }
            );
           

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}