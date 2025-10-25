const consultationService = require('../services/consultationService');
const jwt = require('jsonwebtoken');
const s3Service = require('../services/s3Service');


module.exports = {


    async create(req, res) {
        try {
            const user = req.user
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
            let result = await consultationService.attachFile(id, file)

            return res.status(200).json({
                message: 'file uploaded successfully',
                result
            });

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: err.message })
        }
    },

    async downloadFile(req, res) {
        try {
            const key = req.params.key;

            if (!key) {
                throw new Error("something went wrong, the file name didn't arrive to server")
            };
            const fileStream = await s3Service.download(key);
            res.attachment(key);
            fileStream.pipe(res);

        } catch (err) {

        }
    }
}