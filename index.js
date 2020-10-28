require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
var allRoutes = require('./api/routers')

var app = express()
app.use(express.json())
app.use('/api/', allRoutes)


app.listen(process.env.APP_PORT, ()=>{
    console.log("Server is listening on port " + process.env.APP_PORT);
})