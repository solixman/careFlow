const express = require('express');
const router= express.Router();
const appointementController= require('../controllers/appointementController');
const auth = require('../middlewares/authMiddleware');


router.post('/create',auth,appointementController.create);

router.get('',auth,appointementController.index);

router.post('/status/:id',auth,appointementController.changeStatus);

router.post('/update/:id',auth,appointementController.update);

module.exports= router;