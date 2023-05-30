const mongoose = require('mongoose')



const TokenSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    token : {
        type: String,
    },
    refresh_token : {
        type: String
    }
})


module.exports = mongoose.model("token", TokenSchema)