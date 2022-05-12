var express = require('express')
var app = express()
var {connectToDb,getDbConnection} = require('./dbs')
var {ObjectId} = require('mongodb')
let dbs
app.use(express.json())
connectToDb((err)=>{
    if(!err)
    {
        app.listen(7080,()=>{
            console.log("Server running on PORT:7080")
        })
        dbs = getDbConnection()
    }
})

app.get("/favourite",(req,res)=>{
    let result = []
    dbs.collection('Favourite')
    .find()
    .sort({actor:1})
    .forEach(favs => result.push(favs))
    .then(()=>{
        res.status(200).json(result)
    })
    .catch(()=>{
        res.status(500).json({error:"Error found"})
    })
})
app.get("/favourite/user/:id",(req,res)=>{
     if(ObjectId.isValid(req.params.id))
     {
         dbs.collection('Favourite')
         .findOne({_id:ObjectId(req.params.id)})
         .then((doc)=>{
             res.status(200).json(doc)
         })
     }
     else{
         res.status(500).json({error:"Doc Not Found"})
     }
   
})
app.post('/favourite/add',(req,res)=>{
    const ob = req.body
    dbs.collection('Favourite')
    .insertOne(req.body)
    .then((result)=>{
        res.status(201).json(result)
    })
    .catch((err)=>{
        res.status(500).json({error:"not found"})
    })
})
app.delete('/favourite/remove/:id',(req,res)=>{
    const rid = req.params.id
    dbs.collection('Favourite')
    .deleteOne({_id:ObjectId(rid)})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch(()=>{
        res.status(500).json({error:"not found"})
    })
})
app.patch('/favourite/update/:id',(req,res)=>{
    const rid = req.params.id
    const updates = req.body
    dbs.collection('Favourite')
    .updateOne({_id:ObjectId(rid)},{$set:updates})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch(()=>{
        res.status(500).json({error:"not found"})
    })
})
app.get('/favourite/pages',(req,res)=>{
    let employee = []
    const pg = req.query.pg || 0
    const empPerPage = 2
    dbs.collection('Employee')
    .find()
    .sort({name:1})
    .skip(pg * empPerPage)
    .limit(empPerPage)
    .forEach(emp => employee.push(emp))
    .then(()=>{
        res.status(200).json(employee)
    })
    .catch((err)=>{
        res.status(500).json({err})
    })
})