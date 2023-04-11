const saveToDb = (dataModel) =>{
    return dataModel.save();
}

const findSingleDataDb = (dataModel,key,value) =>{
    if (key === '_id') {
        return dataModel.findById(value);
    }
    return dataModel.findOne({ [key]: value });
}

const getMultipleData = (dataModel,query,limit) =>{
    return dataModel.find(query)
            .skip(skip)
            .limit(limit)
            .exec();
}

const updateSingleData = (dataModel,query,data)=>{
    console.log(query,data);
    return dataModel.updateOne(
                query, // Query
                data // Update
            ).exec();
}

const removeSingleData = (dataModel,id)=>{
    return dataModel.findByIdAndRemove(id);
}


module.exports = {
    saveToDb,
    findSingleDataDb,
    getMultipleData,
    updateSingleData,
    removeSingleData
}