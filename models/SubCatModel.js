const { model, Schema } = require('mongoose')
const schematypes = require('./allSchemaTypes')

const SubCategorySchema = new Schema(
    { 
        name: {
            type: String,
            required: true,
            minlength: [3, "Name should be at least 3 charecters"],
            maxlength: [15, "Name should be at most 15 charecters"],
        },
        desc: {
            type: String,
            required: true,
            minlength: [10, "Name should be at least 20 charecters"],
            maxlength: [80, "Name should be at most 100 charecters"],
        },
        cat_id:{
            type:Schema.Types.ObjectId,
            ref:schematypes.cat,
            required:true
        },
        order_tracker: [Number],
        createdAT: {
            type: Number,
            required: true
        },
        updatedAT: {
            type: Number,
            required: true
        }
    }
)

const SubCategoryModel = model(schematypes.sub_cat, SubCategorySchema);
module.exports = SubCategoryModel;