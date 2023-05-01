const OrderModel = require("../models/OrderModel");
const UserMoel = require("../models/UserModel");
const dbOperation = require("../service/Operation");
const { Response, error, RealDateToTimeStamps, calculateTotalprice } = require("../utils/commonFunc");

//todo:make payment more secure.
//todo: if paid mailing invoice
//todo**: secure transaction and validate it
//todo*:get product and matching price and update order track
//check product price and payment amount by fetching products
const createOrder = async(req,res,next) =>{
    try{
        const { user, products, comments, phone, transaction, address,courier } = req.body;
        let time = RealDateToTimeStamps(new Date());
        let amount = calculateTotalprice(products);
        if (amount !== transaction.paymentAmount) throw error("Invalid Request");
        const orders = new OrderModel({
            user, products, comments, phone, transaction, address, courier, createdAT: time, updatedAT:time
        })
        let order = await dbOperation.saveToDb(orders);
        Response(order,201,res);

    }catch(e){
        next(e)
    }
}

const getSingle = async(req,res,next) =>{
    try {
        const id = req.params.id;
        let order = await dbOperation.findSingleDataDb(OrderModel, '_id', id);
        if (!order?.id) {
            throw commonFunc.error('Order not found', 404);
        }
        console.log("getSingle");
        Response(order,200,res);
    } catch (e) {
        next(e);
    }
}

const updateSingleOrder = async(req,res,next) =>{
    try{
        if (!req.user?.roles?.includes('ADMIN')) throw error("User can't access", 401);
        let { status, courier } = req.body;
        let {id} = req.params;
        let time = RealDateToTimeStamps(new Date());
        let updatableObj = {};
        if(status) updatableObj.status = status;
        if(courier) updatableObj.courier = courier;
        updatableObj.updatedAT = time;
        await dbOperation.updateSingleData(OrderModel, { '_id': id }, updatableObj, res);
    }catch(e){
        next(e);
    }
}

//add query of createdAt and updatedAt
const getMultipleData = async(req,res,next) =>{
    try{
        let { address, user, ids, status, courier, transaction } = req.body;
        let {limit,page} = req.params;
        limit = limit ?? 10;
        page = page ?? 1;
        if (!req.user.roles.includes('ADMIN')){
            if(req.user['_id']!== user) throw error("Illegal request",401);
            let order = await dbOperation.getMultipleData(UserModel, {_id:{ $in: ids }}, limit, page);
            return Response(order,200,res);
        }
        let query = {};
        if(address){
            address.upazilla ? query["address.upazilla"] = address.upazilla : null;
            address.district ? query["address.district"] = address.district : null;
        }
        if (transaction){
            transaction.cashing_system ? query["transaction.cashing_system"] = transaction.cashing_system : null;
            transaction.paymentMethod ? query["transaction.paymentMethod"] = transaction.paymentMethod : null;
        }
        if(user){
            query.user = user;
        }
        if(status) query.status = status;
        if(courier) query.courier = courier;
        console.log(query)
        const orders = await dbOperation.getMultipleData(OrderModel, query, limit, page);
        Response(orders,200,res);
    }catch(e){
        next(e);
    }
}

module.exports = {
    createOrder,
    getSingle,
    updateSingleOrder,
    getMultipleData
}