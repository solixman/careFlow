const express=require('express');
const router= express.Router();
const auth = require('../middlewares/authMiddleware');
const prescriptionController = require('../controllers/prescriptionController');
const isDoctor=require('../middlewares/isDoctor.js')

router.post('/:id',auth,isDoctor,prescriptionController.create)

module.exports = router;    