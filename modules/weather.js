const express = require("express")
const router = express.Router()
const {saveWeatherdata,getNextId,weather} = require("../utils/store")

router.post('', (req,res) =>{
    let data = req.body
    data.id = getNextId(weather)
    weather.push(data)
    saveWeatherdata()
    res.send({msg:"Sikeres adatfelvitel!"})
})

router.patch('', (req,res)=>{
    let id = Number(req.params.id)
    let data = req.body
    let idx = weather.findIndex(weather => Number(weather.id) === id)

    if(idx >-1){
        if(data.date) weather[idx].date = data.date
        if(data.minmax) weather[idx].minmax = data.minmax
        if(data.name) weather[idx].name = data.name
    }
})
module.exports = router