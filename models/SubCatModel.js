const { model, Schema } = require('mongoose')
const schematypes = require('./allSchemaTypes')

const SubCategorySchema = Schema(
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
            minlength: [20, "Name should be at least 20 charecters"],
            maxlength: [100, "Name should be at most 100 charecters"],
        },
        cat_id:{
            type:Schema.Types.ObjectId,
            ref:schematypes.cat,
            required:true
        },
        order_tracker: [Number]
    },
    {
        timestamps: true
    }
)

const SubCategoryModel = model(schematypes.cat, SubCategorySchema);
module.exports = SubCategoryModel;