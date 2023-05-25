const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect('mongodb+srv://manishsharma:manishseekware@cluster0.t6ur0vi.mongodb.net', {
        }).then((data) => {
            console.log('MongoDB Connected')
        }).catch((error) => {
            console.log(error)
        })
}


module.exports = connectDB;