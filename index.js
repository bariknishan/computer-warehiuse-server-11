
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port = process.env. PORT || 5000 ;
const app =express() ;



/////////// middleware area

app.use(cors());
app.use(express.json()) ;


 ////// connection///////////


 ;
 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bqpm0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


 async function run (){
 try{

    await client.connect();
    const itemsCollection = client.db('ComputerWarehouse').collection('items');

 //for all user

   app.get('/items', async(req,res)=>{
    const query={}
    const cursor = itemsCollection.find(query)
    const itemsBundle= await cursor.toArray();
    res.send(itemsBundle) ;
   });


 //// for single user///

  app.get('/items/:id', async(req,res)=>{

    const id = req.params.id ;
    const query={_id:ObjectId(id)};
    const items= await itemsCollection.findOne(query);
    res.send(items)
  });

// post  area ////

 app.post('/items' , async(req,res)=>{

    const newItems= req.body ;
    const result = await itemsCollection.insertOne(newItems)
    res.send(result)
 })

 // delete
 app.delete('/items/:id' , async(req,res)=>{
     const id = req.params.id ;
     const query ={_id:ObjectId(id)}
     const result= await itemsCollection.deleteOne(query)
     res.send(result);
 })


 }

  finally{

}


 }

 run().catch(console.dir);




// root 
app.get('/' , (req, res)=>{
    res.send('warehouse server is running')
});

app.listen(port,()=>{
    console.log('server is running on port', port)
})