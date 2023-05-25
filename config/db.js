const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/manish_sharma", {
        }).then((data) => {
            console.log('MongoDB Connected')
        }).catch((error) => {
            console.log(error)
        })
}


module.exports = connectDB;