
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env. PORT || 5000 ;
const app =express() ;



/////////// middleware area

app.use(cors());
app.use(express.json())


// root 
app.get('/' , (req, res)=>{
    res.send('warehouse server is running')
});

app.listen(port,()=>{
    console.log('server is running on port', port)
})