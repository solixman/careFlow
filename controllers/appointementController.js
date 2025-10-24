const appointmentService = require('../services/appointmentService');
const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');

module.exports = {

    async create(req, res) {

        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "No token provided" });
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
            let patientId;
            if (user.role === 'patient') {
                patientId = user.id;
            } else {
                patientId = req.body.patientId ;
            }
            let appointment = await appointmentService.create(patientId, user, req.body);
            let message; 
            if(appointment.status==='unconfirmed'){
            message='your appointment has been created, but the date you chose is accupide,you can change the date or time, or wait you will be notified when the secretery choses one for you';
            }else{
            message='your appointment has been created succesfully';
            }
            return res.status(200).json({ appointment, message});

        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    },


    async index(req, res) {

        try {

            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "No token provided" });
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


            let filters = {
                doctor: req.query.doctorId,
                status: req.query.status,
                isUrgent: req.query.isUrgent,
                date: req.query.date,
                PatientName: req.query.PatientName
            }

            let { appointments, total } = await appointmentService.getAll(user, filters, parseInt(req.query.skip) || 0);

            res.status(200).json({
                appointments,
                message: 'Appointments fetched successfully',
                total,
                limit: 10,
                skip: req.query.skip || 0,
            });


        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }

    },

    async changeStatus(req, res) {
        try {

            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "No token provided" });
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


            const appointementId = req.params.id;
            const status = req.body.status;
            const appointement = await appointmentService.changeStatus(user, appointementId, status);

            res.status(200).json({
                message: 'this appointment is now ' + status,
                appointement
            });

        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    },


    async update(req, res) {
        try {

               const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "No token provided" });
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const appointementId= req.params.id;
            const data = { date, note, doctor, isUrgent } = req.body
            const appointement = await appointmentService.update(user, appointementId,data)
            
            return res.status(200).json({
                message:'appointment updated succesfully',
                appointement
            })
        } catch (err) {
          console.error(err);
            res.status(400).json({ error: err.message });
        }
    }


}