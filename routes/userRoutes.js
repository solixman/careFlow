const express=require('express');
const router= express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');


router.post('/create',auth,userController.create); 

router.post('/status/:id',auth, userController.changeStatus);
router.get('/all',auth,userController.getAll)

router.get('/profile/:id',auth,userController.getOne)
router.get('/profile',auth,userController.getOne)

router.patch('/update',auth,userController.update)
router.patch('/update/:id',auth,userController.update)


module.exports=router;