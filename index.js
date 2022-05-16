const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aqwkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const serviceCollection = client.db('doctors_portal').collection('services')
        app.get('/service', async(req,res)=>{
          const qurey = {}
          const cursor = serviceCollection.find(qurey)
          const services = await cursor.toArray()
          res.send(services)
        })
    }
    finally{

    }

}

run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, ()=>{
  console.log('listening the server', port)
})