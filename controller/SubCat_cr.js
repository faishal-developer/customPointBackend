const SubCategoryModel = require('../models/SubCatModel');
const dbOperation = require('../service/Operation');
const { error, Response, checkAndPush, RealDateToTimeStamps } = require("../utils/commonFunc");

const createSubCat = async (req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {name,desc,cat_id} = req.body;
        let time = RealDateToTimeStamps(new Date());
        let subcat = new SubCategoryModel({name,desc,cat_id,createdAT:time,updatedAT:time});
        const isExisted = await dbOperation.findSingleDataDb(SubCategoryModel,'name',subcat.name);
        if(isExisted?.name === name) throw error("Subcategory allready existed",400);
        subcat = await dbOperation.saveToDb(subcat);
         Response(subcat,201,res);
    }catch(e){
        next(e);
    }
}

const getSingle = async(req,res,next)=>{
    try{
        const {id} = req.params;
        console.log("id",id);
        const subCat = await dbOperation.findSingleDataDb(SubCategoryModel,'_id',id);
        if(!subCat) throw error('Subcat not found',404);
        return Response(subCat,200,res);
    }catch(e){
        next(e);
    }
}

//hope: getMultiple by id
const getMultiple = async (req,res,next) =>{
    try {
        let { limit, page } = req.query;
        if (!limit) {
            limit = 10;
        }
        if (!page) {
            page = 1;
        }
        let query = {};
        let { name, createdAt, updatedAt } = req.body;
        if (name) query.name = { $exists: true };
        if (createdAt) {
            query.createdAt = {};
            if (createdAt.after) {
                query.createdAt['$gt'] = createdAt.after;
            }
            if (createdAt.before) {
                query.createdAt['$lt'] = createdAt.before;
            }
        }
        if (updatedAt) {
            query.updatedAt = {};
            if (updatedAt.after) {
                query.updatedAt['$gt'] = updatedAt.after;
            }
            if (updatedAt.before) {
                query.updatedAt['$lt'] = updatedAt.before;
            }
        }
        const SubCategories = await dbOperation.getMultipleData(SubCategoryModel, query, limit, page);
        Response(SubCategories, 200, res);

    } catch(e){
        next(e);
    }
}


//hope: api testing for falsy value;
const updateOne = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const query = {};
        if(!id)throw error("Subcategory not found",404);
        const payload = req.body;
        checkAndPush(query,payload);
        query.updatedAT = RealDateToTimeStamps(new Date());
        await dbOperation.updateSingleData(SubCategoryModel, { '_id': id }, query, res);
    }catch(e){
        next(e);
    }
}

const deleteOne = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const data = await dbOperation.removeSingleData(SubCategoryModel,id);
        if(!data)throw error("Subcategory not found",404);
        Response({message:"Success"},203,res);
    }catch(e){
        next(e);
    }
}

module.exports = {
    createSubCat,
    getSingle,
    getMultiple,
    updateOne,
    deleteOne
}