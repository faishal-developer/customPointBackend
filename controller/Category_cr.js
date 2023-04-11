const CategoryModel = require("../models/CatModel");
const dbOperation = require('../service/Operation');
const { error, returnResponse } = require("../utils/commonFunc");

// todo: test
const createCategory = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {name,desc} = req.body;
        let category = CategoryModel({name,desc})
        const isExisted = await dbOperation.findSingleDataDb(category,'name',name);
        if(isExisted.name === name) throw error("Category name already exist",400);
        category = await dbOperation.saveToDb(category);
        return returnResponse({ message: 'Category created successfully', category },201,res);
    }catch(e){
        next(e)
    }
}

//todo: testing
const getSingleCategory = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const category = await dbOperation.findSingleDataDb(CategoryModel,'_id',id);
        if(!category)throw error('Category not found',404);
        return returnResponse({category},200,res);
    }catch(e){
        next(e);
    }
}

//todo: implement later
const getMultiple = async(req,res,next) =>{
    try{
        let {limit,page} = req.query;
        let query = {};
        let searchableObj = req.body;

    }catch(e){
        next(e);
    }
}

//todo: check if wrong data provided and validate if updated
const updateCategory = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const data = req.body;
        const updatableObj = {};
        checkAndPush(updatableObj,data);
        let updated = await dbOperation.updateSingleData(CategoryModel,{'_id':id},updatableObj);
        return returnResponse(updated,200,res);
    }catch(e){
        next(e);
    }
}

//todo:test
//todo: delete sub categories also;
const deleteSingleCat =async (req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const category = await dbOperation.removeSingleData(CategoryModel,id);
        if(!category)throw error('Category not found',404);
        returnResponse({},203);
    }catch(e){
        next(e);
    }
}
module.exports = {
    createCategory,
    getSingleCategory,
    getMultiple,
    updateCategory,
    deleteSingleCat
}