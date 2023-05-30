const express = require('express');
const {scheduleController} = require('../controllers/index');
const {Auth} = require('../middleware/index')
const router = express.Router();



router.post('/',scheduleController.createSchedule );
router.get('/appointment/:id',  Auth.veriftToken,scheduleController.getAppointments)
router.post('/slots', scheduleController.getAviableSlots);





module.exports = router;