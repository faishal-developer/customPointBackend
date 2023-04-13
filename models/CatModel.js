const { model, Schema } = require('mongoose')
const schematypes = require('./allSchemaTypes')

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [5, "Name should be at least 5 charecters"],
            maxlength: [15, "Name should be at most 15 charecters"],
        },
        desc: {
            type: String,
            required: true,
            minlength: [20, "Description should be at least 20 charecters"],
            maxlength: [100, "Description should be at most 100 charecters"],
        },
        sub_cat_list:[{
            type:Schema.Types.ObjectId,
            ref:schematypes.sub_cat
        }],
        order_tracker:[Number]
    },
    {
        timestamps: {
            currentTime: () => Math.floor(Date.now() / 3600000)
        }
    }
)

const CategoryModel = model(schematypes.cat,CategorySchema);
module.exports = CategoryModel;