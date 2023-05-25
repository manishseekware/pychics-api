const express = require('express');
const {categoryController} = require('../controllers/index');
const router = express.Router();



router.post('/',categoryController.AddCategory );
router.get('/', categoryController.getAllCategory)
router.get('/type', categoryController.getCategoryByType)






module.exports = router;
