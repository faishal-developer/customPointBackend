const { error, Response } = require("../utils/commonFunc");

const saveToDb = (dataModel) =>{
    return dataModel.save();
}

const findSingleDataDb = (dataModel,key,value) =>{
    if (key === '_id') {
        return dataModel.findById(value);
    }
    return dataModel.findOne({ [key]: value });
}

const getMultipleData = (dataModel,query,limit,skip) =>{
    return dataModel.find(query)
            .skip(skip)
            .limit(limit)
            .exec();
}

const sortAndFind = (dataModel,property,limit) =>{
    return dataModel.find({})
            .sort({ [property]: -1 }) // Sort products by order_tracker field in descending order
            .limit(limit) // Only return the top 10 products
            .exec();
}

const updateSingleData = (dataModel,query,data,res)=>{

    const options = { new: true, runValidators: true };

    return dataModel.findOneAndUpdate(query, data, options, (err, doc) => {
        if (err) {
            throw error("Failed to update",500);
        } else {
            Response({message:"Successfull",doc,res});
        }
    });
}

const removeSingleData = (dataModel,id)=>{
    return dataModel.findByIdAndRemove(id);
}

const removeMultiple = (dataModel,ids) =>{
    return dataModel.deleteMany({ _id: { $in: ids } })
}


module.exports = {
    saveToDb,
    findSingleDataDb,
    getMultipleData,
    updateSingleData,
    removeSingleData,
    removeMultiple,
    sortAndFind
}