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
    console.log("***************************************bodyservice^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^" , req.body)
    const user = await auth_Services.clientLogin(req.body.email, req.body.password)
    console.log(user)
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
        console.log(req.user)
        const user = await auth_Services.getUserById(req.params.id)
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


 const getProfessionalByType = async(req,res) =>{
    console.log("%%%%%%%%%%%%%%%%%%%%%%% Professional by type%%%%%%%%%%%%%%%%%%%%%%%%")
try{
if(!req.query.type){
    return res.status(404).json({
        message: "Type Is Required "
    })
}
const professnial = await auth_Services.getProfessionalByType(req.query.type);
if(professnial.status === 200){
 return res.status(professnial.status).json({
    message: professnial.message, 
    professnial: professnial.professnial
 })
}
return res.status(professnial.status).json({
    message: professnial.message, 
    professnial: professnial
})

}catch(err){
    console.log(err);
    res.status(500).json({
        message: err.message
    })
 }
 }


 const logout = async (req, res) => {
 const message =  await auth_Services.logout(req.body.token);
 if(message){
    return res.status(400).json({
        message: message.message
    })
 }
  res.status(200).send();
};



module.exports = {
    userRegister,
    userlogin,
    updateUserProfile,
    resetPassword,
    getUsersById,
    getAllprofessnal,
    getProfessionalByType,
    logout
}