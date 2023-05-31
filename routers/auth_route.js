const express = require('express');
const {authController} = require('../controllers/index');
const {Auth} = require('../middleware/index')
const validate = require('../middleware/validate')
const authValidter = require('../validater/auth.validter')

 
const  router = express()

// Client Auth API

router.post('/client/register' ,validate(authValidter.clientRegister) ,authController.userRegister);
router.post('/client/login',authController.userlogin);
router.put('/client/update/:id', authController.updateUserProfile);
router.put('/client/reset-password/:id', authController.resetPassword);
router.get('/client/:id',Auth.veriftToken ,authController.getUsersById)
router.post('/client/logout/', authController.logout);



router.post('/professnial/register', validate(authValidter.professionalRegister), authController.userRegister);
router.post('/professnial/login',authController.userlogin);
router.put('/professnial/update/:id', authController.updateUserProfile);
router.put('/professnial/reset-password/:id', authController.resetPassword);
router.get('/professnial/type', authController.getProfessionalByType)
router.get('/professnial/:id', Auth.veriftToken, authController.getUsersById);
router.post('/professnial/logout', authController.logout)




module.exports = router

