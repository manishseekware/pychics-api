const express = require('express');
const {userController} = require('../controllers/index');
const {Auth} = require('../middleware/index')


const router = express()

router.get('/dashboard/:userId' ,Auth.veriftToken, userController.getClientDashboardData)




module.exports = router;