const CategoryModel = require("../models/CatModel");
const SubcategoryModel = require("../models/allSchemaTypes");
const dbOperation = require('../service/Operation');
const { error, Response, checkAndPush } = require("../utils/commonFunc");

const createCategory = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {name,desc} = req.body;
        let category = new CategoryModel({name,desc})
        const isExisted = await dbOperation.findSingleDataDb(CategoryModel,'name',name);
        if(isExisted?.name === name) throw error("Category name already exist",400);
        category = await dbOperation.saveToDb(category);
        return Response({ message: 'Category created successfully', category },201,res);
    }catch(e){
        next(e)
    }
}

const getSingleCategory = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const category = await dbOperation.findSingleDataDb(CategoryModel,'_id',id);
        if(!category)throw error('Category not found',404);
        return Response({category},200,res);
    }catch(e){
        next(e);
    }
}
//hope
const getMultiple = async(req,res,next) =>{
    try{
        let {limit,page} = req.query;
        if(!limit){
            limit = 10;
        }
        if(!page){
            page = 1;
        }
        let query = {};
        let {name,createdAt,updatedAt,ids} = req.body;
        if (name) query.name = { $exists: true };
        if (createdAt) {
            query.createdAt = {};
            if(createdAt.after){
                query.createdAt['$gt'] =  createdAt.after;
            }
            if(createdAt.before){
                query.createdAt['$lt'] =  createdAt.before;
            }
        }
        if (updatedAt) {
            query.updatedAt = {};
            if(updatedAt.after){
                query.updatedAt['$gt'] =  updatedAt.after;
            }
            if(updatedAt.before){
                query.updatedAt['$lt'] =  updatedAt.before;
            }
        }
        if(ids){
            query['_id'] = {$in:ids };
        }

        const categories = await dbOperation.getMultipleData(CategoryModel,query,limit,page);
        Response(categories,200,res);

    }catch(e){
        next(e);
    }
}

//hope: check if wrong data provided and validate if updated
//hope:schema validation is not working.
const updateCategory = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const data = req.body;
        const updatableObj = {};
        checkAndPush(updatableObj,data);
        await dbOperation.updateSingleData(CategoryModel,{'_id':id},updatableObj,res);
    }catch(e){
        next(e);
    }
}

//todoLater: update products category field, related with deleted category
const deleteSingleCat =async (req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const category = await dbOperation.removeSingleData(CategoryModel,id);
        if(!category)throw error('Category not found',404);
        //hope:console.log category , if category found then delete all subcategories also
        await dbOperation.removeMultiple(SubcategoryModel, category.sub_cat_list);
        Response({message:'Successfull'},203,res);
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