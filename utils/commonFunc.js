const jwt = require('jsonwebtoken');

const error = (msg="Something went wrong",status=500)=>{
    const e = new Error(msg);
    e.status = status;
    return e;
}

const createJwtToken = (user) =>{
    return jwt.sign(user, 'secret-key', { expiresIn: '20h' });
}

module.exports = {
    error,
    createJwtToken
}