const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailhealper = require('../utlis/email')
const {User, Wallet , Token} = require('../models/index');
const token = require('../models/token');

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
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECTET, {expiresIn:"1h"});
    const refreshToken = jwt.sign({_id: user._id}, process.env.JWT_SECTET, {expiresIn: "30"});
    await Token.create({userId: user._id, token: token ,refresh_token: refreshToken})
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
    console.log(email , password)
    if(!email && !password){
        console.log("Please enter")
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
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECTET, {expiresIn:"1h"});
    const refreshToken = jwt.sign({_id: user._id}, process.env.JWT_SECTET, {expiresIn: "30d"});
     await Token.create({userId: user._id, token: token ,refresh_token: refreshToken})
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
    console.log(id)
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


const getProfessionalByType = async(type) => {

const regex = new RegExp(`^${type.charAt(0)}`, "i");
 // const professional = await User.find({ specialities: regex });
  const professnial = await User.find({specialities: regex});
  if(!professnial ||  professnial.length === 0) {
    return {
        message: `No personal information ${type} found`,
        status : 400
    }
  }
return {
    message: 'All Results',
    professnial: professnial, 
    status: 200
}

}



 const logout = async (refreshToken) => {
    console.log(refreshToken)
  const refreshTokenDoc = await Token.findOne({ token: refreshToken});
  console.log(refreshTokenDoc)
  await Token.deleteOne({ token: refreshToken})
  if (!refreshTokenDoc) {
    return {
        message: "Invalid Token"
    }
  }
};




module.exports = {
    userRegisterServices,
    clientLogin,
    UpdateProfile,
    resetPassword,
    getUserById,
    getAllPsychics,
    getProfessionalByType,
    logout
}