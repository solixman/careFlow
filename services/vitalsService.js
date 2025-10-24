// const Consultation = require('../models/Consultation');
const Vitals = require('../models/Vitals');

module.exports = {

    async create(id, { bloodPressure, heartRate, temerature, weight, innerHeight, respiratoryRate, oxygenSaturation }) {
        try {
            let vitals = new Vitals({consultation:id, bloodPressure, heartRate, temerature, weight, innerHeight, respiratoryRate, oxygenSaturation });

            return await vitals.save()


        } catch (err) {
            throw err
        }
    }

}