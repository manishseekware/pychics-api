const express = require('express');
const {authController} = require('../controllers/index');
const authValidter  = require('../validater/index');

const  router = express()

// Client Auth API

router.post('/client/register' ,authController.userRegister);
router.post('/client/login',authController.userlogin);
router.put('/client/update/:id', authController.updateUserProfile);
router.put('/client/reset-password/:id', authController.resetPassword);
router.get('/client/:id', authController.getUsersById)


router.post('/professnial/register',authController.userRegister);
router.post('/professnial/login',authController.userlogin);
router.put('/professnial/update/:id', authController.updateUserProfile);
router.put('/professnial/reset-password/:id', authController.resetPassword);




module.exports = router

