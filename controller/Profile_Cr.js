const dbOperation = require('../service/Operation');
const UserModel = require('../models/ProfileModel');
const commonFunc = require('../utils/commonFunc');
const { query } = require('express');
const { default: mongoose } = require('mongoose');

//todoLater*: make secure during creating admin user
const postUser = async(req,res,next)=>{
    const { user_auth_id,age, gender } = req.body;
    try {
        let time = commonFunc.RealDateToTimeStamps(new Date());
        let profile = new UserModel({
            age,
            gender,
            user_auth_id:mongoose.Types.ObjectId(user_auth_id),
            createdAT: time,
            updatedAT: time 
        })
        // let isExisted = await dbOperation.findSingleDataDb(UserModel,'email',email)
        // if(isExisted){
        //     throw commonFunc.error('Invalid credentials',401);
        // }
        profile = await dbOperation.saveToDb(profile);
        // const token = commonFunc.createJwtToken({name:profile.name,email:profile.email,_id:profile._id});
        
        return res.status(201).json({message:'profile created successfully',profile});
    } catch (e) {
        next(e);
    }
}

//todoLater:make two different route for get user and login
//todoLater:send jwt token by api header
const singleUser = async(req,res,next)=>{
    try{
        const id = req.params.id;
        let user = await dbOperation.findSingleDataDb(UserModel,'_id',id);
        if(!user?.email){
            throw commonFunc.error('User not found',400);
        }
        res.status(200).json({user});
        
    }catch(e){
        next(e);
    }
}

const getMultipleUser = async(req,res,next)=>{
    try{
        if(!req.user?.roles?.includes('ADMIN')) throw commonFunc.error("User can't access",401);
        const { createdAt, name, email } = req.body;
        let { limit, page } = req.query;
        limit = limit ? limit : 10;

        const newQ = {};
        if (name) newQ.name = name;
        if (email) newQ.email = email;
        if (createdAt) {
            query.createdAt = {};
            if (createdAt.after) {
                query.createdAt['$gt'] = createdAt.after;
            }
            if (createdAt.before) {
                query.createdAt['$lt'] = createdAt.before;
            }
        }
        const [results, total] = await dbOperation.getMultipleData(UserModel,newQ,limit,page);
        console.log(results,total);
        res.status(200).json({message:"ok",results,total});
    }catch(e){
        next(e);
    }
}

//hope: update roles by checking admin authentication
const updateUser = async(req,res,next)=>{
    try{
        const { phone, age, gender, productsIds } = req.body;
        const {id} = req.params;
        let time = commonFunc.RealDateToTimeStamps(new Date());
        let data = {};
    
        if(!id) throw commonFunc.error("Id is not valid",400);
        if(age) data.age = age;
        if(phone) data.phone = phone;
        if(gender) data.gender = gender;
        if(productsIds) data.productsIds = productsIds;
        data.updatedAT = time;
        await dbOperation.updateSingleData(UserModel, { '_id': id }, data, res);
    }catch(e){
        next(e);
    }
}

const deleteUser = async(req,res,next)=>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw commonFunc.error("User can't access", 401);
        const {id} = req.params;
        const user = await dbOperation.removeSingleData(UserModel,id);

        //todoLater: delete user orders
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