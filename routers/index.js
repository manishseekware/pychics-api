const express = require('express');
const authRouter = require('./auth_route');
const category = require('./category.route');
const schdule = require('./schedule_route')
const wallet = require('./wallet_router')
const userRouter = require('./user_router')
const app = express()





app.use('/auth', authRouter);
app.use('/category', category);
app.use('/schedule',schdule);
app.use('/wallet', wallet);
app.use('/user', userRouter)



module.exports = app;