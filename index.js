const express = require('express');
const connectDb = require('./db/db');
const port = process.env.port || 5000;
const dotenv = require('dotenv');
const router = require('./routes/routes');

dotenv.config();
const app = express();
app.use(express.json());
app.use(router);

// todo:generate log file
app.get('/',(_req,res)=>{
    res.json({message:'server is running'});
})

app.use((err,_req,res,_next)=>{
    res.status(err.status? err.status : 500).json({message:err.message});
})

connectDb(process.env.MONGODB_C_URL )
    .then(()=>{
        console.log("database connected to",process.env.MONGODB_C_URL);
        app.listen(port,()=>{console.log('express is working now',port)})
    })
    .catch((e)=>console.log(e));