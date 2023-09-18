/* eslint-disable no-undef */
const express = require('express');
const connectDb = require('./db/db');
const port = process.env.port || 5000;
const dotenv = require('dotenv');
const router = require('./routes/routes');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const Config = require('./utils/Config');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors())


app.use(router);

// todoLater:generate log file
app.get('/',(_req,res)=>{
    res.json({message:'server is running , invalid credentials'});
})

app.use((err,_req,res)=>{
    res.status(err.status? err.status : 500).json({message:err?.message ?? "Something went wrong"});
})
// eslint-disable-next-line no-undef
console.log("kaj korvai",process.env.MONGODB_C_URL,Config.MONGODB_URL);
connectDb(Config.MONGODB_URL )
    .then(()=>{
        // eslint-disable-next-line no-undef
        console.log("database connected to",process.env.MONGODB_C_URL);
        app.listen(port,()=>{console.log('express is working now',port)})
    })
    .catch((e)=>console.log(e));