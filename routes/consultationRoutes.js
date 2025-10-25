const express=require('express');
const router= express.Router();
const consultationController= require('../controllers/ConsulationController');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/authMiddleware');
const isDoctor=resuire('../middlewares/isDoctor.js')
const isNotPatient = require('../middlewares/isNotPatient');


router.post('/:id',auth,isDoctor,consultationController.create);
router.post('/:id/attach-file',auth,isNotPatient, upload.single('file'), consultationController.attachFile);
router.get('/download/:key',auth, consultationController.downloadFile);


module.exports=router;