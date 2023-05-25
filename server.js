const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const indexRouter = require('./routers/index.js')
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'https://2f25-14-194-33-198.in.ngrok.io'
}));

app.get('/', (req,res) => {
    res.status(200).json({
        messag: "App is Started "
    })
})

app.use('/api/v1', indexRouter)



//Database connection established
connectDB()



app.listen(process.env.PORT || 4004, () => {
    console.log(`server is listening on ${process.env.PORT}`)
})








