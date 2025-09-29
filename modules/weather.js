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

router.patch('/:id', (req,res)=>{
    let id = Number(req.params.id)
    let data = req.body
    let idx = weather.findIndex(weather => Number(weather.id) === id)

    if(idx >-1){
        if(data.date) weather[idx].date = data.date
        if(data.minmax) weather[idx].minmax = data.minmax
        if(data.name) weather[idx].name = data.name
        saveWeatherdata()
        res.send({msg:"Sikeres adatfrissítés!"})
    }
    res.status(400).send({msg:"Nincs ilyen azonosítójú időjárásadat"})

    
})
router.delete('/:id', (req,res)=>{
    let id = Number(req.params.id)
    let idx = weather.findIndex(weather => Number(weather.id) === id)
    if(idx >-1){
    weather.splice(idx,1)
    saveWeatherdata()
    res.send({msg:"Sikeres törlés!"})
    }
    res.status(400).send({msg:"Nincs ilyen azonosítójú időjárásadat"})
})

router.get('', (req,res) =>{
    res.send(weather)
})
module.exports = router