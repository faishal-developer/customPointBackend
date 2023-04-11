const jwt = require('jsonwebtoken');

const error = (msg="Something went wrong",status=500)=>{
    const e = new Error(msg);
    e.status = status;
    return e;
}

const createJwtToken = (user) =>{
    return jwt.sign(user, 'secret-key', { expiresIn: '20h' });
}

const checkAndPush = (obj, updatableObjPro) => {
    for (let keys in updatableObjPro) {
        if (updatableObjPro[keys]) obj[keys] = updatableObjPro[keys];
    }
}

const Response = (data={},status=200,res)=>{
    return res.status(status).json(data);
}

module.exports = {
    error,
    createJwtToken,
    checkAndPush,
    Response
}