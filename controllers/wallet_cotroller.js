const {wallet_services} = require('../services/index');


const  addMoneytoWallet = async(req,res) => {
    try{
    const wallet = await wallet_services.addMonetWallet(req.body.user, req.body.balance);
    console.log(wallet);
    if(wallet.statusCode === 1){
        return res.status(200).json({
            message: wallet.message,
            balence: wallet.balance,
            status: 200
        })
    }else {
        return res.status(500).json({
            message: wallet.message,
            status: 400
        })
    }
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
}


const getUserWallet = async(req,res) => {
    try{
    const wallet = await wallet_services.getUserWallet(req.user);
    console.log(wallet)
    if(wallet.statusCode === 1) {
        console.log("Eroro")
        return res.status(200).json({
         message: wallet.message,
         wallet: wallet,
         statusCode: 200
        })
    }

    return res.status(400).json({
           message: wallet.message,
            statusCode: 400
    })
    }catch(err){
         console.log(err);
        res.status(400).json({message: err.message});
    }
}





module.exports = {
    addMoneytoWallet,
    getUserWallet
}