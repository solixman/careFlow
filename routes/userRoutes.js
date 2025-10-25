const express=require('express');
const router= express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin')

router.post('/create',auth,isAdmin,userController.create); 

router.post('/status/:id',auth,isAdmin, userController.changeStatus);
router.get('/all',auth,isAdmin,userController.getAll)

router.get('/profile/:id',auth,userController.getOne)
router.get('/profile',auth,userController.getOne)

router.patch('/update',auth,userController.update)
router.patch('/update/:id',isAdmin,auth,userController.update)


module.exports=router;