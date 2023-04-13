const jwt = require('jsonwebtoken');
const Config = require('./Config');

const error = (msg="Something went wrong",status=500)=>{
    const e = new Error(msg);
    e.status = status;
    return e;
}

const createJwtToken = (user) =>{
    return jwt.sign(user, Config.secret, { expiresIn: Config.expiresIn });
}

const checkAndPush = (obj, updatableObjPro) => {
    for (let keys in updatableObjPro) {
        if (updatableObjPro[keys]) obj[keys] = updatableObjPro[keys];
    }
}

const Response = (data={},status=200,res)=>{
    return res.status(status).json(data);
}

const getRealDate = (timestamps) =>{
    let hours = Number(timestamps);
    let time = hours * 3600000;
    return new Date(time);
}

const RealDateToTimeStamps = (date) =>{
    date = new Date(date);
    let timestamps = Math.floor(date/ 3600000);
    return timestamps;
}

module.exports = {
    error,
    createJwtToken,
    checkAndPush,
    Response,
    getRealDate,
    RealDateToTimeStamps
}