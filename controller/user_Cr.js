const dbOperation = require('../service/Operation');
const UserModel = require('../models/UserModel');
const commonFunc = require('../utils/commonFunc');
const { query } = require('express');

//todo: make secure during creating admin user
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
//todo:send jwt token by api header
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

//todo: create query by createdAt
const getMultipleUser = async(req,res,next)=>{
    try{
        if(!req.user.roles.includes('ADMIN')) throw error("User can't access",401);
        const { createdAt, name, email } = req.body;
        let { limit, page } = req.query;
        limit = limit ? limit : 10;
        skip = page ? (page - 1) * limit : 0;

        const newQ = {};
        if (createdAt) newQ.createdAt = createdAt;
        if (name) newQ.name = name;
        if (email) newQ.email = email;

        const results = await dbOperation.getMultipleData(UserModel,newQ,limit);
        res.status(200).json({message:"ok",results});
    }catch(e){
        next(e);
    }
}

//todo: update roles by checking admin authentication
const updateUser = async(req,res,next)=>{
    const { name, phone, age, gender, productsIds } = req.body;
    const {id} = req.params;
    let query = {};
    try{
        if(!id) throw commonFunc.error("Id is not valid",400);
        if(name) query.name = name;
        if(age) query.age = age;
        if(phone) query.phone = phone;
        if(gender) query.gender = gender;
        if(productsIds) query.productsIds = productsIds;

        let user = await dbOperation.updateSingleData(UserModel,{'_id':id},query);
        //todo:if user insertion 0 then throw error
        if(!user){
            throw commonFunc.error("User not found",404);
        }
        res.status(200).json({message:'ok',user});
    }catch(e){
        next(e);
    }
}

const deleteUser = async(req,res,next)=>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const user = await dbOperation.removeSingleData(UserModel,id);

        //todo: delete user orders
        if(!user) throw commonFunc.error("User not found",404);
        res.status(203).send();
    }catch(e){
        next(e);
    }
}

module.exports = {
    postUser,
    singleUser,
    getMultipleUser,
    updateUser,
    deleteUser
};