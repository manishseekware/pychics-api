const jwt = require('jsonwebtoken');
// const {User} = require('../models/index')



    /**
     * Verigy token 
     *
     */
const veriftToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).json({
            message: "Token is required"
        })
    }
    const token = req.headers.authorization.split('Bearer ')[1];
    console.log(token)
    if (!token) {
        return res.status(403).send({
            message: " There will be No Token "
        })
    }

    console.log(process.env.JWT_SECTET)
    jwt.verify(token, process.env.JWT_SECTET, (err, decoded) => {
        console.log(err)
        console.log(decoded)
        if (err) {
            return res.status(401).send({
                message: "Unauthorthorized "
            })
        }

        req.user = decoded._id;
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", req.user)
        next();
    })
}



module.exports = {
    veriftToken
}