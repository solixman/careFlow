const Appointment = require('../models/Appointment')
const Patient = require('../models/Patient');
const User = require('../models/User');

module.exports = {


    async create(patientId, user, { name, date, doctorId, purpose, note, isUrgent }) {
        try {
            let patient;
            date=new Date(date);

            let scheduledBy = user.id;

            if (patientId) {
                patient = await User.findById(patientId);
                if (!patient || patient.role !== 'patient') throw new Error("Patient not found, if you're not patient please go to the admin for an appointement");
                name = patient.name;
            }


            const doctor = await User.findById(doctorId);
            if (!doctor || doctor.role !== 'doctor') throw new Error("Invalid doctor ID .");

            let isAvailabale = await this.checkperiod(doctor,date)

            purpose ??= 'unknown';
            note ??= 'without a note';
            isUrgent ??= false;

            if ((!patientId && !name) || !doctorId || !date) throw new Error("patient's name, doctor and date are required for an appointement");
            return await this.store(patientId, name, scheduledBy, date, doctorId, purpose, note,isUrgent, isAvailabale);


        } catch (err) {
            console.log(err);
            throw err
        }



    },




    async store(patientId, name, scheduledBy, date, doctorId, purpose, note, isUrgent,isAvailabale) {
        try {


            const appointment = new Appointment({
                patientName: name,
                patient: patientId,
                doctor: doctorId,
                date: date,
                purpose,
                note,
                isUrgent,
                scheduledBy
            });
           

            if(isAvailabale){
             appointment.status='confirmed'
             }

            await appointment.save();

            return appointment;
        } catch (err) {
            console.log(err)
            throw err
        }

    },

    async getAll(user, filters, skip = 0) {

        try {

            let query = this.makeQuery(user, filters)
            console.log(query);
            let appointments = await Appointment.find(query).limit(20).skip(skip).sort({ createdAt: -1 });;
            let total = await Appointment.countDocuments(query);

            return { appointments, total };
        } catch (err) {
            console.log(err);
            throw err
        }

    },

    makeQuery(user, filters) {
        let query = {};

        if (user.role === 'doctor') {
            query.doctor = user.id;
        } else if (user.role === 'patient') {
            if (filters.PatientName) {
                query.patientName = { $regex: filters.PatientName, $options: 'i' };
            } else {
                query.patient = user.id;
            }
        }

        if (filters.date) {
            const day = new Date(filters.date);
            const nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);
            query.date = { $gte: day, $lt: nextDay };
        }

        if (filters.patientName) query.patientName = { $regex: filters.patientName, $options: 'i' };
        if (filters.status) query.status = filters.status;
        if (filters.doctor) query.doctor = filters.doctor;
        if (filters.isUrgent !== undefined) query.isUrgent = filters.isUrgent === 'true';

        return query;
    },


    async changeStatus(user, appointementId, status) {
        try {

            const allowed = ['waiting', 'confirmed', 'unconfirmed', 'in-progress', 'completed', 'cancelled'];

            if (!allowed.includes(status)) {
                throw new Error('Invalid status value');
            }

            if (user.role === 'patient' && status !== 'cancelled') {
                throw new Error('user not allowed');

            }

            let appointement = await Appointment.findById(appointementId);
            if (!appointement) {
                throw new Error('appointment not found');
            }
            if (appointement.status = 'completed') throw new Error(" this appointement has already been completed");


            appointement.status = status;
            await appointement.save();
            return appointement;
        } catch (err) {
            console.log(err);
            throw err;
        }

    },

    async update(user, id, data) {
        try {

            let appointement = await Appointment.findById(id);
            if (!appointement) throw new Error("something went wrong, this appointement doesn't exist");
            if (appointement.status === 'completed') throw new Error(" this appointement has already been completed");

            if (data.date) appointement.date = data.date;
            if (data.doctor) appointement.doctor = data.doctor;
            if (data.note) appointement.note = data.note;
            if (data.isUrgent !== undefined) appointement.isUrgent = data.isUrgent;

            if (user.role = 'patient') {
                appointement.status = 'unconfirmed';
            }

            return await appointement.save()

        } catch (err) {
            throw err
        }
    },

    async checkperiod(doctor,date) {

        const oneHourBefore = new Date(date.getTime() - 30 * 60 * 1000)
        const oneHourAfter = new Date(date.getTime() + 90 * 60 * 1000)

        let capacity=doctor.capacity || 4;

        let count =  await Appointment.countDocuments({
            date: {
                $gte: oneHourBefore,
                $lte: oneHourAfter
            }
        })
   
        if(capacity>count){
            return true
        }else{
            return false
        }
    }
}