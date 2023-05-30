const express = require('express')
const {walletController} = require('../controllers/index');
const {Auth} = require('../middleware/index')

const router = express();



router.post('/add',Auth.veriftToken, walletController.addMoneytoWallet);
router.get('/',Auth.veriftToken, walletController.getUserWallet)






module.exports = router;



