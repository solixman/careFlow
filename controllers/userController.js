const User = require('../models/User');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');


module.exports = {

    async create(req, res) {
        try {

            const user = await userService.createUser(req.body);
            res.status(201).json({
                message: 'User created successfully',
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            });

        } catch (err) {
            console.log({ error: err.message });
            res.status(400).json({ error: err.message });
        }
    },


    async changeStatus(req, res) {
        try {

            const userId = req.params.id;
            const status = req.body.status;
            console.log(status);
            const allowed = ['active', 'suspended', 'inactive'];
            if (!allowed.includes(status)) {
                return res.status(400).json({ error: 'Invalid status value' });
            }

            const updatedUser = await userService.changeStatus(userId, status);

            res.status(200).json({
                message: 'this user is now' + status,
                user: updatedUser
            });

        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    },

    async getAll(req, res) {


        try {

            const filters = {
                status: req.query.status,
                role: req.query.role,
                name: req.query.name
            };

            const { users, total } = await userService.getAll(filters, req.query.skip);

            res.status(200).json({
                users,
                message: 'Users fetched successfully',
                total,
                limit: 10,
                skip: req.query.skip || 0,
            });



        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }

    },


    async getOne(req, res) {

        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "No token provided" });
            let user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            let id;

            if (req.params.id) {
                id = req.params.id;
            } else {
                id = user.id;
            }
            user = await userService.getOne(id);

            return res.status(200).json({
                message: 'user fetched succesfully',
                user
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

            let id = user.id;
            if (req.params.id) {
                if (user.role !== 'admin') throw new Error('only an admion can change anothers profile')
                id = req.params.id;
            }

            if(user.role !== 'admin' && req.body.role) throw new Error('only an admion can change a role');   
            
            const { name, email, avatar, phone, address, dateOfBirth, specialty,role } = req.body;
            const data = { name, email, avatar, phone, address, dateOfBirth, specialty,role }; 
            const { gender, insurenceInfo, allergies, medicalReport, bloodType, height, weight, emergencyContact } = req.body
            const patientdata = { gender, insurenceInfo, allergies, medicalReport, bloodType, height, weight, emergencyContact }

            const updatedUser = await userService.update(id, data, patientdata)

            return res.status(200).json({
                message: 'user updated succesfully',
                updatedUser
            })


        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }
    }

}