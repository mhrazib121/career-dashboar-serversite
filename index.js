const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const res =require('express/lib/response');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvulc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
        const database = client.db("careerDashboard")
        const allDataCollection = database.collection("allData");

        app.get('/jobposts', async(req, res)=>{
            const cursor = allDataCollection.find({});
            const data = await cursor.toArray();
            res.send(data);
        })

        // job post in server 
        app.post('/jobposts', async(req, res)=>{
            const data =req.body;
            const result = await allDataCollection.insertOne(data);
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send('Hellow World')
})

app.listen(port,()=>{
    console.log('connected')
})