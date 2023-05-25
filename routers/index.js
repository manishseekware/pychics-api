const express = require('express');
const authRouter = require('./auth_route');
const category = require('./category.route');
const schdule = require('./schedule_route')
const app = express()





app.use('/auth', authRouter);
app.use('/category', category);
app.use('/schedule',schdule);



module.exports = app;