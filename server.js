var cors = require('cors')
const fs = require('fs')
const express = require("express")
const path = require("path")
const userRoutes = require("./modules/users")
const weatherRoutes = require("./modules/weather")
const app = express()

//Middlewareek
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/users', userRoutes)
app.use('/weather', weatherRoutes)

app.listen(3000)