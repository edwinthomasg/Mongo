var express = require('express')
var {connection,getDb} = require('./db')
var app = express()
app.use(express.json())
let db
connection((err)=>{
    if(!err){
        app.listen(3050,()=>{
            console.log("Running on : 3050")
        })
        db = getDb()
    }
})

app.get('/user',(req,res)=>{
    let users = []
    db.collection('Employee')
    .find()
    // .sort({name:1})
    .forEach(user => users.push(user))
    .then(()=>{
        res.status(200).json(users)
    })
    .catch(()=>{
        res.status(500).json({error:"Error found"})
    })
})
app.post('/user/add',(req,res)=>{
    let data = req.body
    db.collection('Employee')
    .insertOne(data)
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})
