const express=require('express');
const router= express.Router();
const consultationController= require('../controllers/ConsulationController');
const upload = require('../middlewares/upload');




router.post('/:id',consultationController.create);
router.post('/:id/attach-file', upload.single('file'), consultationController.attachFile);
router.get('/download/:key', consultationController.downloadFile);


module.exports=router;