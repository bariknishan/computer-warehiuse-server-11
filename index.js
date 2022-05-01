
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb')
const port = process.env. PORT || 5000 ;
const app =express() ;



/////////// middleware area

app.use(cors());
app.use(express.json())


 ////// connection///////////


 ;
 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bqpm0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 client.connect(err => {
   const collection = client.db("test").collection("devices");
   console.log('computer server is connected')
   // perform actions on the collection object
   client.close();
 });
 





// root 
app.get('/' , (req, res)=>{
    res.send('warehouse server is running')
});

app.listen(port,()=>{
    console.log('server is running on port', port)
})