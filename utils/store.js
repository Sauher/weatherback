const path = require("path")
const fs = require("fs")
const { json } = require('stream/consumers');

let users = []
let weather = []
const USER_FILE = path.join(__dirname,"..", "/database/", "users.json")
const WEATHER_FILE = path.join(__dirname,"..", "/database/", "weather.json")


InitStore()
function InitStore(){
    loadUsers()
    loadWeatherdata()
}
function isEmailExist(email){
    let exists = false
    users.forEach(user => {
        if(user.email == email){
            exists = true
            return
        }});
    return exists

}
function getNextId(array){
    let NextId = 1

    if(array.length == 0){
        return NextId
    }

    let maxId = 0
    for (let i = 0; i < array.length; i++) {
        if(array[i].id > array[maxId].id){
            maxId = i
        }
        
    }
    return array[maxId].id +1
}
function loadUsers(){
    if(fs.existsSync(USER_FILE)){
        const raw = fs.readFileSync(USER_FILE)
        try{
            users = JSON.parse(raw)
        }
        catch(err){
            console.log("Hiba az adatok beolvasása közben!",err)
            users = []
        }
    }
    else{
        saveUsers()
    }
}
function loadWeatherdata(){
    if(fs.existsSync(WEATHER_FILE)){
        const raw = fs.readFileSync(WEATHER_FILE)
        try{
            weather = JSON.parse(raw)
        }
        catch(err){
            console.log("Hiba az adatok beolvasása közben!",err)
            weather= []
        }
    }
    else{
        saveWeatherdata()
    }
}
function saveUsers(){
    fs.writeFileSync(USER_FILE,JSON.stringify(users))
}
function saveWeatherdata(){
    weather.sort((a,b) => new Date(a.date) - new Date(b.date))
    fs.writeFileSync(WEATHER_FILE,JSON.stringify(weather))
}
module.exports = {saveUsers,loadUsers,getNextId,isEmailExist,saveWeatherdata,loadWeatherdata,users,weather}