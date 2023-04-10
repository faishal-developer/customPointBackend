const dbOperation = require('../service/Operation');
const UserModel = require('../models/UserModel');
const commonFunc = require('../utils/commonFunc');

const postUser = async(req,res,next)=>{
    const { email, name, roles, age, gender } = req.body;
    try {
        let user = new UserModel({
            name,
            email,
            roles,
            age,
            gender
        })
        let isExisted = await dbOperation.findSingleDataDb(UserModel,'email',email)
    
        if(isExisted){
            throw commonFunc.error('Invalid credentials',401);
        }
        user = await dbOperation.saveToDb(user);
        user = { name: user.name, email: user.email, _id: user._id,roles:user.roles,age:user.age,gender:user.gender }
        const token = commonFunc.createJwtToken({name:user.name,email:user.email,_id:user._id});
        
        return res.status(201).json({message:'User created successfully',user,token});
    } catch (e) {
        next(e);
    }
}


//todo:make two different route for get user and login
const singleUser = async(req,res,next)=>{
    try{
        const id = req.params.id;
        const {all} = req.query;
        let user = await dbOperation.findSingleDataDb(UserModel,'_id',id);
        if(!user.email){
            throw commonFunc.error('User not found',400);
        }
        user = all ? user : { _id: user._id,name:user.name, email:user.email,roles:user.roles,age:user.age,gender:user.gender};
        const token = commonFunc.createJwtToken({ name: user.name, email: user.email, _id: user._id });
        res.status(200).json({user,token});
        
    }catch(e){
        next(e);
    }
}

module.exports = {
    postUser,
    singleUser
};