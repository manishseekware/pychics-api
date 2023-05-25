const express = require('express');
const {scheduleController} = require('../controllers/index');
const router = express.Router();



router.post('/',scheduleController.cerateSchedule );





module.exports = router;