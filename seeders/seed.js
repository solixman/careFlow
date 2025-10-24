const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');
const InsuranceInfo = require('../models/InsuranceInfo');

dotenv.config();

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careflow');
        console.log('✅ Connected to DB');

        // Optional: clear old data
        await Promise.all([
            User.deleteMany({}),
            Patient.deleteMany({}),
            Appointment.deleteMany({}),
            Notification.deleteMany({}),
            InsuranceInfo.deleteMany({})
        ]);
        console.log('🧹 Cleared old data');

        // 🔐 Create base users
        const hashedPassword = await bcrypt.hash('123456', 10);

        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@careflow.com',
            password: hashedPassword,
            role: 'admin',
            isActive: true
        });

        const doctor = await User.create({
            name: 'Dr. Soulayman Jaafar',
            email: 'soulayman@careflow.com',
            password: hashedPassword,
            role: 'doctor',
            phone: '0611223344',
            address: 'Casablanca, Morocco',
            specialty: 'Cardiology',
            isActive: true
        });

        const nurse = await User.create({
            name: 'Nurse Laila',
            email: 'laila@careflow.com',
            password: hashedPassword,
            role: 'nurse',
            phone: '0600112233',
            address: 'Casablanca, Morocco',
            isActive: true
        });

        // 🏥 Create insurance info
        const insuranceInfo = await InsuranceInfo.create({
            provider: 'AXA Assurance',
            serialNumber: 'AXA-2025-0098',
            coverageType: 'Full',
            phone: '+212600445566',
            email: 'support@axa.ma',
            address: 'Casablanca, Morocco'
        });

        // 👨‍⚕️ Create patient
        // 🧍‍♂️ Create user for the patient
        const patientUser = await User.create({
            name: 'Hamid S9alli',
            email: 'hamid@s9l.com',
            password: hashedPassword,
            role: 'patient',
            phone: '0600123456',
            address: 'Casablanca, Morocco',
            isActive: true
        });

        // 👨‍⚕️ Create patient record linked to that user
        const patient = await Patient.create({
            userId: patientUser._id, // ✅ required link
            gender: 'male',
            insuranceInfo: insuranceInfo._id,
            allergies: ['Penicillin'],
            medicalReport: 'Healthy overall, mild hypertension.',
            bloodType: 'A+',
            height: 1.78,
            weight: 75,
            emergencyContact: '+212600998877'
        });

        // 📅 Create appointment
        const appointment = await Appointment.create({
            patient: patient._id,
            doctor: doctor._id,
            madeBy: admin._id,
            date: new Date(),
            hour: '14:00',
            status: 'scheduled',
            notes: 'Routine follow-up for blood pressure check.'
        });

        // 🔔 Create notifications
        const notification1 = await Notification.create({
            user: doctor._id,
            type: 'reminder',
            subject: 'Upcoming appointment',
            message: `You have an appointment with ${patient.name} today at 14:00.`,
            isSeen: false
        });

        const notification2 = await Notification.create({
            user: patient._id,
            type: 'info',
            subject: 'Appointment Confirmation',
            message: 'Your appointment with Dr. Soulayman is confirmed for today.',
            isSeen: false
        });

        console.log('✅ Seeded data successfully!');
        console.log({
            admin: admin.email,
            doctor: doctor.email,
            nurse: nurse.email,
            patient: patient.email,
            appointment: appointment._id,
            insuranceInfo: insuranceInfo.provider
        });

        await mongoose.connection.close();
        console.log('🔒 Connection closed');
    } catch (err) {
        console.error('❌ Error seeding database:', err);
        process.exit(1);
    }
}

seedDatabase();
