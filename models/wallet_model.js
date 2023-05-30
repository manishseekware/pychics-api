const mongoose = require('mongoose');


const walletSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    balence: {
        type: Number,
         default: 0
    },
    status: {
        type: String,
        default : 'active'
    },

}, {
    timestamps: true
})




module.exports = mongoose.model('wallet', walletSchema);