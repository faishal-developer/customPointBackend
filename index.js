const express = require('express');
const connectDb = require('./db/db');
let port = process.env.port || 5000;

const app = express();
app.use(express.json());

app.get('/',(_req,res)=>{
    res.json({});
})

app.use((err,_req,res,_next)=>{
    res.status(err.status? err.status : 500).json({message:err.message});
})

connectDb()