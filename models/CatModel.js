const { model, Schema } = require('mongoose')
const schematypes = require('./allSchemaTypes')

const CategorySchema = Schema(
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
        sub_cat_list:[{
            type:Schema.Types.ObjectId,
            ref:schematypes.sub_cat
        }],
        order_tracker:[Number]
    },
    {
        timestamps: true
    }
)

const CategoryModel = model(schematypes.cat,CategorySchema);
module.exports = CategoryModel;