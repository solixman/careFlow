const express=require('express');
const router= express.Router();
const consultationController= require('../controllers/ConsulationController');



router.post('/:id',consultationController.create);


module.exports=router;