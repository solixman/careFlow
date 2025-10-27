const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const prescriptionController = require('../controllers/prescriptionController');
const isDoctor = require('../middlewares/isDoctor.js')
const { body } =require('express-validator');
const validate =require('../middlewares/validate.js');


router.post('/:id', auth, [
    body('pharmacyId').notEmpty().withMessage('Pharmacy ID is required'),
    body('prescriptionItems').isArray({ min: 1 }).withMessage('At least one item required')
],validate, isDoctor, prescriptionController.create);

module.exports = router;    