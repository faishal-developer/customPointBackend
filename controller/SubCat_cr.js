const SubCategoryModel = require("../models/SubCatModel");
const dbOperation = require("../service/Operation");
const { error, Response, checkAndPush } = require("../utils/commonFunc");

const createSubCat = async (req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {name,desc,cat_id} = req.body;
        let subcat = new SubCategoryModel({name,desc,cat_id});
        const isExisted = await dbOperation.findSingleDataDb(SubCategoryModel,'name',subcat.name);
        if(!isExisted) throw error("Subcategory allready existed",400);
        subcat = await dbOperation.saveToDb(subcat);
        return Response(subcat,201,res);
    }catch(e){
        next(e);
    }
}

const getSingle = async(req,res,next)=>{
    try{
        const {id} = req.params;
        const subCat = await dbOperation.findSingleDataDb(SubCategoryModel,'_id',id);
        if(!subcat) throw error('Subcat not found',404);
        return Response(subCat,200,res);
    }catch(e){
        next(e);
    }
}

//todo: getMultiple by id
const getMultiple = async (req,res,next) =>{
    try{
        //todo: full
    }catch(e){
        next(e);
    }
}


//todo: api testing for falsy value;
const updateOne = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const query = {};
        if(!id)throw error("Subcategory not found",404);
        const payload = req.body;
        checkAndPush(query,payload);
        const updatedData = await dbOperation.updateSingleData(SubCategoryModel,{"_id":id},query);
        Response(updatedData,201,res);
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