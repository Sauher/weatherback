const express = require("express")
const router = express.Router()
const {saveWeatherdata,weather} = require("../utils/store")




module.exports = router