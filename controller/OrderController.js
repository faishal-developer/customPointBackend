const OrderModel = require("../models/OrderModel");
const { saveToDb } = require("../service/Operation");
const { Response } = require("../utils/commonFunc");

//todo:make payment more secure.
//todo: if paid mailing invoice
//todo: api testing
const createOrder = async(req,res,next) =>{
    try{
        const { user, products, comments, phone, transaction, address,courier } = req.body;
        const orders = new OrderModel({
            user, products, comments, phone, transaction, address,courier
        })
        let order = await saveToDb(orders);
        Response(order,201,res);

    }catch(e){
        next(e)
    }
}