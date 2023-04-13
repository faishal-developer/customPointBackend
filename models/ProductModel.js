const { model, Schema} = require('mongoose');
const schematypes = require('./allSchemaTypes');

//hope: array length validation
//hope: save timstaps as minutes
//hope: make cat_id and subcat_id required
const ProductSchema = new Schema(
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
            validate: {
                validator: function (v) {
                    return v.length >=1 && v.length<=5;
                },
                message: props => `${props.path} Should have length between 1 to 10`
            }
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
            required:true
        },
        subCat_id:{
            type:Schema.Types.ObjectId,
            ref:schematypes.sub_cat,
            required:true
        },
        order_track:{
            type:Number,
            default:0
        },
        star:[Number],
        sizes:[String],
        color:[String]
    },
    {
        timestamps: {
            currentTime: () => Math.floor(Date.now() / 3600000)
        }
    }
);

const ProductModel = model(schematypes.product,ProductSchema);

module.exports = ProductModel;