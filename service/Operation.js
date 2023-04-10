const saveToDb = (dataModel) =>{
    return dataModel.save();
}

const findSingleDataDb = (dataModel,key,value) =>{
    if (key === '_id') {
        return dataModel.findById(value);
    }
    return dataModel.findOne({ [key]: value });
}

module.exports = {
    saveToDb,
    findSingleDataDb,
}