const ProductModel = require("../models/ProductModel");
const dbOperation = require("../service/Operation");
const { error, checkAndPush } = require("../utils/commonFunc");

//todo: unique product identify
//todo: add category id and subcat id here
//todo:check uniqeness
//todo:why schema validation is not working when i save string instead of number
const createProduct = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {name,desc,images,price,cat_id,sizes,color} = req.body;
        let product = new ProductModel({
            name,desc,images,cat_id,price,sizes,color
        });
        product = await dbOperation.saveToDb(product);
        res.status(201).json({message:'Created successfully',product});
    }catch(e){
        next(e)
    }
}

//todo:test api urgently
const getSingleProduct = async(req,res,next) =>{
    try{
        const {id} = req.params;
        const product = await dbOperation.findSingleDataDb(ProductModel,'_id',id);
        if(!product) throw error("Product not found",404);
        res.status(200).json({message:'ok',product});
    }catch(e){
        next(e);
    }
}

//todo: elastic search
const getMultiple = async(req,res,next) =>{
    try{
        const { cat_id, subCat_id, createdAt, order_track, price, name } = req.body;
        const {limit,page} = req.query;
    }catch(e){
        next(e);
    }
}

//todo:test
const deleteOne = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const product = await dbOperation.removeSingleData(ProductModel,id);
        if(!product)throw error("Product not found",404);
        res.status(203).send();
    }catch(e){
        next(e);
    }
}

//todo: it is not working as per as schema validation
//todo: for wrong objectid we should provide 404 error
const updateOne = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const updatable = req.body;
        const query = {};
        checkAndPush(query,updatable);
        let product = await dbOperation.updateSingleData(ProductModel,{'_id':id},query);
        //todo: validation checking that the product updated or not
        res.status(200).json({ message: 'ok', product });
    }catch(e){
        next(e);
    }
}


module.exports = {
    createProduct,
    getSingleProduct,
    getMultiple,
    deleteOne,
    updateOne
}