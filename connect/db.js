var {MongoClient} = require('mongodb')
let dbConnection
module.exports = {
    connection: (cb) => {
        MongoClient.connect('mongodb+srv://Edwin:5ceKONB6VLLspQWP@cluster0.tx3ao.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then((client)=>{
            dbConnection = client.db()
            return cb()
        })
        .catch((err)=>{
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}