const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const indexRouter = require('./routers/index.js')
const serverless = require('serverless-http')
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(cors({
   "Access-Control-Allow-Origin": "*"
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




module.exports = {
  handler: serverless(app)
}

