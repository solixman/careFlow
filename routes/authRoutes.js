const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');


router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout',auth, authController.logout);

module.exports = router;
