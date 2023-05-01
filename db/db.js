const mongoose = require('mongoose');

// mongodb connection with mongoose
const connectDb = (connectionStr) =>{

    return mongoose.connect(connectionStr, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    })
}

module.exports = connectDb;