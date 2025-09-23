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


router.get('/:id', (req,res)=>{
    let id = Number(req.params.id)
    let idx = users.findIndex(user => Number(user.id) === id)
    if(idx >-1){
        return res.send(users[idx])
    }
    return res.status(400).send({msg: "Nincs ilyen azonosítójú felhasználó!"})
})

router.patch('/:id', (req,res) =>{
    let data = req.body

    let idx = users.findIndex(user => Number(user.id) === data.id)
    if(idx >-1){
        if(data.email && data.email != users[idx].email){
            let exists = users.some(user => user.email === data.email && Number(user.id) !== id)
            if(exists){
                return res.status(400).send({msg: "bademail"})
            }
            users[idx].email = data.email
            
        }
        if(data.name) users[idx].name = data.name
        saveUsers()
        res.send({msg: "Sikeres fríssítés!"})
        
    }
    return res.status(400).send({msg: "Hiba a frissítés során"})
})
router.patch('/changepass/:id', (req,res) =>{
    let data = req.body
    let idx = users.findIndex(user => Number(user.id) === data.id)

    if(idx >-1){
        users[idx].password = data.password
        saveUsers()
        res.send({msg: "Sikeres fríssítés!"})
    }
    return res.status(400).send({msg: "Hiba a frissítés során"})
})

module.exports = router