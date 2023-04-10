const mongoose = require('mongoose');

// mongodb connection with mongoose
const connectDb = (connectionStr) =>{
    return mongoose.connect(connectionStr,{
        serverSelectionTimeoutMS:1000
    })
}

module.exports = connectDb;