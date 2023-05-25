const jwt  = require('jsonwebtoken');
const {auth_Services} = require('../services/index')




const userRegister = async(req, res) => {
    try{
    const user = await auth_Services.userRegisterServices(req.body)
    if(user.message === "Successfully"){
        return res.status(user.statusCode).json({
            message: user.message,
            user: user.user,
            token: user.token,
            refreshToken: user.refreshToken
        })
    }else {
        return res.status(user.statusCode).json({
            message: user.message,

        })
    }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}


const userlogin = async(req,res) => {
    try{
    const user = await auth_Services.clientLogin(req.body.email, req.body.password)
    if(user.message === "Successfully"){
        return res.status(user.statusCode).json({
            message: user.message,
            user: user.user,
            token: user.token,
            refreshToken: user.refreshToken
        })
    }else {
        return res.status(user.statusCode).json({
            message: user.message,
        })
    }
}catch(error){
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}


const updateUserProfile = async(req,res) =>{
    try{
    const user = await auth_Services.UpdateProfile(req.params.id, req.body)
    if(user.message === "Successfully"){
        return res.status(user.statusCode).json({
            message: user.message,
            user: user.user,
            token: user.token,
            refreshToken: user.refreshToken
        })
    }else {
        return res.status(user.statusCode).json({
            message: user.message,
        })
    }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const getUsersById = async(req,res) => {
    try{
        const user = await getUserById(req.params.id)
         if(user.message === "Successfully"){
        return res.status(user.statusCode).json({
            message: user.message,
            user: user.user,
            token: user.token,
            refreshToken: user.refreshToken
        })
    }else {
        return res.status(user.statusCode).json({
                    message: user.message,
                })
    }
    }catch(error){
        console.log(error);
        return res.status(500).json({
             message: error.message
         })
    }
}

const resetPassword = async(req,res) => {
    try{
    const user = await auth_Services.resetPassword(req.params.id, req.body.password)
    if(user.message === "Successfully"){
        return res.status(user.statusCode).json({
            message: user.message,
        })
    }else {
        return res.status(user.statusCode).json({
            message: user.message,
        })
    }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}

const getAllprofessnal = async(req,res) => {
    try{
    const user = await auth_Services.getAllPsychics()
    if(user.message === "Successfully"){
        return res.status(user.statusCode).json({
            message: user.message,
            user: user.user,
            token: user.token,
            refreshToken: user.refreshToken
        })
    }else {
        return res.status(user.statusCode).json({
            message: user.message,
        })
    }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
}



module.exports = {
    userRegister,
    userlogin,
    updateUserProfile,
    resetPassword,
    getUsersById,
    getAllprofessnal
}