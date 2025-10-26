const prescriptionservice = require('../services/prescriptionService.js')

module.exports = {

    async create(req, res) {
        try {

            let id = req.params.id;
            let result = await prescriptionservice.create(id, req.body)

            return res.status(201).json({
                message: 'prescription created succesfully',
                result,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message });
        }

    }

}