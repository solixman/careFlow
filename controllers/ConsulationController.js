const consultationService = require('../services/consultationService');
const jwt = require('jsonwebtoken');


module.exports = {


    async create(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: "No token provided" });
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);


            let id = req.params.id;
            if (!id) {
                throw new Error('something went wrong, theres no id');
            }


            const consultation = await consultationService.create(user, id, req.body);

            return res.status(201).json({
                consultation,
                message: 'Consultation created successfully',
            });

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: err.message })
        }
    },


    async attachFile(req, res) {

        try {

            const id = req.params.id;
            const file = req.file
            let result =await  consultationService.attachFile(id, file)

            return res.status(200).json({
                message:'file uploaded successfully',
                result
            });

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: err.message })
        }

    }
}