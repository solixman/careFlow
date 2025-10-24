const express = require('express');
const router= express.Router();
const appointementController= require('../controllers/appointementController');


router.post('/create',appointementController.create);

router.get('',appointementController.index);

router.post('/status/:id',appointementController.changeStatus);

router.post('/update/:id',appointementController.update);

module.exports= router;