const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        }).then((data) => {
            console.log('MongoDB Connected')
        }).catch((error) => {
            console.log(error)
        })
}


module.exports = connectDB;