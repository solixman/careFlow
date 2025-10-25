const express=require('express');
const router= express.Router();
const consultationController= require('../controllers/ConsulationController');
const upload = require('../middlewares/upload');
const auth = require('../middlewares/authMiddleware');




router.post('/:id',auth,consultationController.create);
router.post('/:id/attach-file',auth, upload.single('file'), consultationController.attachFile);
router.get('/download/:key',auth, consultationController.downloadFile);


module.exports=router;