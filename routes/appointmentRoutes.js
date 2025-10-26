const express = require('express');
const router = express.Router();
const appointementController = require('../controllers/appointementController');
const auth = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');

router.post('/create', auth,
    [body('name').optional().isString(),
    body('date').notEmpty(),
    body('doctorId').notEmpty().isMongoId(),
    body('note').optional().isString(),
    body('purpose').optional().isString(),
    body('isUrgent').optional().isBoolean(),
    ], validate, appointementController.create);

router.get('', auth, appointementController.index);

router.post('/status/:id', auth, appointementController.changeStatus);

router.post('/update/:id', auth, appointementController.update);

module.exports = router;