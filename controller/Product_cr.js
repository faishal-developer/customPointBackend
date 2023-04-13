const ProductModel = require("../models/ProductModel");
const dbOperation = require("../service/Operation");
const { error, checkAndPush, Response } = require("../utils/commonFunc");

//hope: unique product identify
//hope: add category id and subcat id here
//hope:why schema validation is not working when i save string instead of number
const createProduct = async(req,res,next) =>{
    try{
        //check if user is admin else throw an error extracted data from req.body
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const { name, desc, images, price, cat_id, sizes, color, subCat_id } = req.body;

        //check uniqeness by checking exact name
        let existedProduct = await dbOperation.findSingleDataDb(ProductModel,'name',name);
        if(existedProduct.name===name)throw error("Product allready exist",400);

        //creating a data model and saved it to db
        let product = new ProductModel({
            name, desc, images, cat_id, price:Number(price), sizes, color, subCat_id
        });
        product = await dbOperation.saveToDb(product);
        res.status(201).json({message:'Created successfully',product});
    }catch(e){
        next(e)
    }
}

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

//hope:find popular product
const getMultiple = async(req,res,next) =>{
    try{
        const { cat_ids, subcat_ids, createdAt, price,keyword } = req.body;
        const {limit,page,ispopular,islatest} = req.query;
        if (!limit) {
            limit = 10;
        }
        if (!page) {
            page = 1;
        }
        let query = {};
        if(ispopular){
            let popularProduct = await dbOperation.sortAndFind(ProductModel,'order_track',limit);
            return Response(popularProduct,200,res);
        }
        if (islatest){
            let latestProduct = await dbOperation.sortAndFind(ProductModel,'createdAt',limit);
            return Response(latestProduct,200,res);
        }
        if (keyword){
            query['$or'] = [
                { name: { $regex: keyword, $options: 'i' } },
                { desc: { $regex: keyword, $options: 'i' } },
            ]
        }
        if(cat_ids){
            query['cat_id'] = { $in: cat_ids };
        }
        if(subcat_ids){
            query['subCat_id'] = { $in: subcat_ids };
        }
        if(price){
            query.price = {};
            if(price.max){
                query.price['$lt'] = price.maximum; 
            }
            if(price.min){
                query.price['$gt'] = price.min; 
            }
        }
        if (createdAt) {
            query.createdAt = {};
            if (createdAt.after) {
                query.createdAt['$gt'] = createdAt.after;
            }
            if (createdAt.before) {
                query.createdAt['$lt'] = createdAt.before;
            }
        }
        const products = await dbOperation.getMultipleData(ProductModel, query, limit, page);
        Response(products,200,res);
    }catch(e){
        next(e);
    }
}

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

//hope: it is not working as per as schema validation
//hope: for wrong objectid we should provide 404 error
const updateOne = async(req,res,next) =>{
    try{
        if (!req.user.roles.includes('ADMIN')) throw error("User can't access", 401);
        const {id} = req.params;
        const updatable = req.body;
        const query = {};
        checkAndPush(query,updatable);
        await dbOperation.updateSingleData(ProductModel, { '_id': id }, query, res);
        //hope: validation checking that the product updated or not
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