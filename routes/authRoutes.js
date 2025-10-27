const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');


router.post('/login',[
body('email').notEmpty().isEmail().withMessage('email is necessery'),
body('password').notEmpty().isString().withMessage('password is necessery'),
],validate, authController.login);

router.post('/register', authController.register);
router.get('/logout',auth, authController.logout);

module.exports = router;
