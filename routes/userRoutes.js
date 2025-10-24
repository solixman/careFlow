const express=require('express');
const router= express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/create',userController.create); 

router.post('/status/:id', userController.changeStatus);
router.get('/all',userController.getAll)

router.get('/profile/:id',userController.getOne)
router.get('/profile',userController.getOne)

router.patch('/update',userController.update)
router.patch('/update/:id',userController.update)


module.exports=router;