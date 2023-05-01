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
    return Promise.all([
        dataModel.find(query).skip((skip-1)*limit).limit(limit).exec(),
        dataModel.countDocuments(query)
    ]);
}

const sortAndFind = (dataModel,property,limit,skip=0) =>{
    return Promise.all([
        dataModel.find({}).sort({ [property]: -1 }).skip((skip - 1) * limit).limit(limit).exec(),
        dataModel.countDocuments({})
    ]);
}

const updateSingleData = (dataModel,query,data,res)=>{

    const options = { new: true, runValidators: true };

    return dataModel.findOneAndUpdate(query, data, options)
            .then((doc) => Response({ message: "Successfull", doc },200,res))
            .catch(er => { throw error("Failed to update", 500) })
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