const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect("mongodb+srv://pychics:pychics@cluster0.iwyddm9.mongodb.net/", {
        }).then((data) => {
            console.log('MongoDB Connected')
        }).catch((error) => {
            console.log(error)
        })
}


module.exports = connectDB;