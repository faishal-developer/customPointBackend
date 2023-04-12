const { model, Schema} = require('mongoose');
const schematypes = require('./allSchemaTypes');

//todo: array length validation
//todo: save timstaps as minutes
//todo: make cat_id and subcat_id required
const ProductSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [8, "Name should be at least 8 charecters"],
            maxlength: [50, "Name should be at most 50 charecters"],
        },
        desc: {
            type: String,
            required: true,
            minlength: [20, "Name should be at least 20 charecters"],
            maxlength: [300, "Name should be at most 300 charecters"],
        },
        images:{
            type:[String],
            required:true,
            minlength: [1, "Minimum 1 image required"],
            maxlength: [5, "Maximum 5 image allowed"],
        },
        price:{
            type:Number,
            required:true,
            validate: {
                validator: function (v) {
                    let number = Number(v);
                    return number >= 5 && number <= 500000;
                },
                message: props => `${props.value} is not a valid price. Price must be an integer between 5 and 500000.`
            }
        },
        cat_id:{
            type:Schema.Types.ObjectId,
            ref:schematypes.cat,
            //todo: required:true
        },
        subCat_id:{
            type:Schema.Types.ObjectId,
            ref:schematypes.sub_cat,
            //todo: required:true
        },
        order_track:{
            type:Number,
            default:0
        },
        star:[Number],
        sizes:[String],
        color:[String]
    },
    {timestapms:true}
);

const ProductModel = model(schematypes.product,ProductSchema);

module.exports = ProductModel;