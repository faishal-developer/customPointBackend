const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Config = require('../utils/Config');

async function authenticate(req,res,next){
    try{
        let token = req.headers.authorization; 
        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }
        token = token.split(" ")[1];

        // hope:make secure jwt by changing 'secret-key'
        const decoded = jwt.verify(token, Config.secret);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    }catch(e){
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = {
    authenticate
}