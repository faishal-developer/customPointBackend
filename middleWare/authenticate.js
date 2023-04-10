const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const { error } = require('../utils/commonFunc');

async function authenticate(req,res,next){
    try{
        let token = req.headers.authorization; 
        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }
        token = token.split(" ")[1];

        // todo:make secure jwt by changing 'secret-key'
        const decoded = jwt.verify(token, 'secret-key');
        const user = await User.findById(decoded._id);
        console.log(user);
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