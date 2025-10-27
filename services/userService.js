const { findById } = require('../models/Appointment');
const Patient = require('../models/Patient');
const User = require('../models/User');
const PatientService = require('./patientService');
const bcrypt = require('bcrypt');

module.exports = {

    ROLES: ['patient', 'admin', 'doctor', 'nurse'],


    async createUser({ name, email, password, role }) {

        try {

            if (!name || !email || !password) {
                throw new Error('name , email and password required');
            }

            console.log(role);
            if (!role) {
                role = 'patient';
            }
            console.log(role);

            if (!this.ROLES.includes(role)) {
                throw new Error('this role is invalid');
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error("An account with this email already exists");
            }
            const newUser = await this.hashAndSave({ name, email, password, role });

            if (newUser.role === 'patient') {

                await PatientService.create(newUser);
            }

            return newUser

        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    async hashAndSave({ name, email, password, role }) {
        try {
            let status = "active"

            if (role != "patient") {
                status = 'inactive';
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            return await User.create({
                name,
                email,
                password: hashedPassword,
                role: role,
                status
            });
        } catch (err) {
            throw err;
        }
    },


    async changeStatus(userId, status) {

        try {
            let user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.status = status;
            await user.save();
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status
            };
        } catch (err) {

            throw err;
        }
    },



    async getAll(filters = {}, skip = 0) {

        try {
            let query = {}

            if (filters.status)
                query.status = filters.status;

            if (filters.role)
                query.role = filters.role;

            if (filters.name)
                query.name = filters.name;


            const users = await User.find(query).select('-password -__v').limit(10).skip(skip);

            const total = await User.countDocuments(query);
            return { users, total }

        } catch (err) {

            throw err;
        }
    },

    async getOne(user, id) {
        try {

            let profile = await profile.findById(id);

            if (!profile) throw new Error("profile doesn't exist");

            if (user.role === 'patient' && profile.role !== 'doctor') throw new Error('a patient is not allowed to see others profiles');

            if (profile.role === 'patient') {
                patient = await PatientService.profileId(id);
                profile = { profile, patient }
            }

            return profile;

        } catch (error) {
            throw err;
        }
    },


    async update(id, data, patientData) {

        try {

           
          let  user =await User.findOneAndUpdate({ _id: id },
                { $set: data },
                { new: true, runValidators: true }
                );

            if (user.role === 'patient') {
                let patient = await PatientService.update(id, patientData);
                return {user,patient}
            }
        
            return user


        } catch (err) {

            throw err;
        }
    },

  


}