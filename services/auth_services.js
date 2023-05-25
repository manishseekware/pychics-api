const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const emailhealper = require('../utlis/email')
const {User, Wallet} = require('../models/index')

const userRegisterServices = async(body) => {
    const userdata = await User.findOne({email: body.email});
    if(userdata){
       return {
            Error: "Error",
            statusCode: 401,
            message: "User already registered"
       }
    }
    const user = await User.create(body);
    await Wallet.create({user: user._id})
    const token = jwt.sign({_id: user._id}, process.env.JWT_TIME, {expiresIn:"1h"});
    const refreshToken = jwt.sign({_id: user._id}, process.env.JWT_TIME, {expiresIn: "1h"});
    if(user && token && refreshToken){
    return  {
        message: "Successfully",
        statusCode: 200,
        user,
        token,
        refreshToken
    }
    }else {
        return {
            Error: "Error",
            statusCode: 401,
            message: "Something went wrong"
        }
    }

}


const clientLogin = async(email, password) => {
    if(!email && !password){
        return {
            Error: "Error",
            statusCode: 400,
            message: "Email or password is required"
        }
    }
    const user = await User.findOne({email: email})
    console.log(user);
    if(!user){
        return {
            Error: "Error",
            statusCode: 401,
            message: "Invalid Email"
        }
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    console.log(isPasswordValid);
    if(!isPasswordValid){
        return {
            Error: "Error",
            statusCode: 401,
            message: "Invalid Password"
        }
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_TIME, {expiresIn:"1h"});
    const refreshToken = jwt.sign({_id: user._id}, process.env.JWT_SECTET, {expiresIn: "1h"});
    // await emailhealper.sendMail()
    return {
        message: "Successfully",
        statusCode: 200,
        user,
        token,
        refreshToken
    }
}

const UpdateProfile = async(id, body) => {
    try{
    await User.findByIdAndUpdate({_id:id}, {
        first_name:body.first_name,
        last_name:body.last_name,
        email:body.email,
        dob: body.dob,
        gender:body.gender,
        address:body.address,
        city:body.city,
        state:body.state,
        pincode:body.pincode,
    })
   return {
    message: "Successfully",
    statusCode: 200,
 
   }
    }catch(err){
        console.log(err)
        res.status(500).json({
        message: "Something went wrong"
        })
    }
}

const resetPassword = async(id, password) => {
    const user = await User.findById({_id: id});
    if(!user){
        return {
            Error: "Error",
            statusCode: 404,
            message: "User not found"
        }
    }
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
      console.log(isPasswordValid);
    if(isPasswordValid){
        return {
            Error: "Error",
            statusCode: 401,
            message: "password not same as prveious"
        }
    }
    user.password = password
    await user.save()
    return {
        message: "Password  Updated Successfully",
        statusCode: 200,
    }
}


const getUserById = async(id) => {
   const user = await User.findById({_id: id})
   if(user){
    return {
            message: "Successfully",
            statusCode: 200,
            user
        }
   }else {
    return {
                Error: "Error",
                statusCode: 404,
                message: "User not found"
            }
   }
}

const getAllPsychics = async() => {
    const user = await User.aggregate([
        {
        $match: {role: "professtional"},
        },
        {
        $project: {
            _id: 1,
            first_name: 1,
            last_name: 1,
            email: 1,
            gender:1,
            dob: 1,
            role: 1,
            specialities: 1
            
        }
    }
    ])
    console.log(JSON.stringify(user))
if(user){
    return {
            message: "Successfully",
            statusCode: 200,
            user
        }
}else {
    return {
                Error: "Error",
                statusCode: 404,
                message: "User not found"
            }
}
}



module.exports = {
    userRegisterServices,
    clientLogin,
    UpdateProfile,
    resetPassword,
    getUserById,
    getAllPsychics
}