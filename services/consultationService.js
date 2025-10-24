const Consultation = require('../models/Consultation');
const appointementService = require('../services/appointmentService');
const vitalsService = require('../services/vitalsService');


module.exports = {

    async create(user, id, { patientId, note, diagnosis, procedures, bloodPressure, heartRate, temperature, weight, height, respiratoryRate, oxygenSaturation }) {

        try {
            
            
            let hasConsultation= await this.consultationExists(id);        
            
            if(hasConsultation){
              throw new Error('something went wrong, appointment already has a consultation');
            }

            let consultation = new Consultation();
            consultation.appointment = id;
            consultation.doctor = user.id;
            consultation.patient = patientId;
            if (note) consultation.note = note;
            if (diagnosis) consultation.diagnosis = diagnosis;
            if (procedures) consultation.procedures = procedures;

            consultation = await consultation.save();

            let vitalsData = {};
            if (bloodPressure) vitalsData.bloodPressure = bloodPressure;
            if (heartRate) vitalsData.heartRate = heartRate;
            if (temperature) vitalsData.temperature = temperature;
            if (weight) vitalsData.weight = weight;
            if (height) vitalsData.height = height;
            if (respiratoryRate) vitalsData.respiratoryRate = respiratoryRate;
            if (oxygenSaturation) vitalsData.oxygenSaturation = oxygenSaturation;


            let vitals = await vitalsService.create(consultation._id, vitalsData)
            return {consultation,vitals};

        } catch (err) {
            throw err
        }
    },

     async consultationExists(id){

        try {

            let consultation =await Consultation.findOne({appointment:id});
            if(consultation){
               return true 
            }
            return false;
            
        } catch (err) {
            throw err
        }
    }

  
}