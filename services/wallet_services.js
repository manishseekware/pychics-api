const {Wallet} = require('../models');

const addMonetWallet = async(user , balance) => {
    console.log(balance)
    console.log("Adding")
    const wallet = await Wallet.findOne({user: user})
    console.log(wallet)
    if(!wallet){
        return {
            message: "Wallet not found",
            statuCode: 0
        }
    }
    wallet.balence = parseInt(wallet.balence) + Math.abs(parseInt(balance));
    console.log(wallet.balence)
    wallet.save();
    console.log(wallet)
    return {
        message: "Money is added to Wallet ",
        wallet: wallet,
        statusCode: 1
    }
}


const getUserWallet = async(user) => {
    const wallet = await Wallet.findOne({ user: user})
    console.log("$$$$$$$$$$$$$$$$$$$$$$" ,wallet)
    if(wallet){
        return {
        message: "User Walet details",
        wallet: wallet,
        statusCode: 1
        }
    }
    return {
         message: "this User wallet is empty ",
            statusCode: 0
    }
}



module.exports = {
    addMonetWallet,
    getUserWallet,
}