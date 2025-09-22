const express = require("express")
const router = express.Router()
const {isEmailExist,saveUsers,users,getNextId} = require("../utils/store")

router.post('', (req,res) =>{
    let data = req.body;
    if(isEmailExist(data.email)){
        return res.status(400).send({msg: "bademail"})
    }
    data.id = getNextId(users)
    users.push(data)
    res.send({msg: "Sikeres regisztráció!"})
    saveUsers()
})

router.post('/login', (req,res) =>{
    let {email,password} = req.body
    let loggeduser = {}
    users.forEach(user=>{
        if(user.email == email && user.password == password){
            loggeduser = user
            return
        }
    })
    res.send(loggeduser)
})



module.exports = router