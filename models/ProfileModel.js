const {model,Schema} = require('mongoose');
const schematypes = require('./allSchemaTypes');

//hope: time is  saving in timestamps
const ProfileSchema = new Schema(
    {
        phone:{
            type:String,
            minlength:9,
            maxlength:12,
        },
        age:{
            type:Number,
            validate: {
                validator: function (v) {
                    const number = Number(v);
                    return  number >= 5 && number <= 120;
                },
                message: props => `${props.value} is not a valid age. Age must be an integer between 5 and 120.`
            }
        },
        gender:{
            type:String,
            enum:['MALE','FEMALE'],
            default:'MALE',
        },
        orderIds:[{
            type:Schema.Types.ObjectId,
            ref: schematypes.order
        }],
        //productids is user cart list saved by id
        productsIds: [{
            _id:{   
                type: Schema.Types.ObjectId,
                ref: schematypes.product
            },
            sizes: [
                {
                    type: String,
                    required: true
                }
            ],
            quantity:{
                type:Number,
                required:true
            }
        }],
        user_auth_id:{
            type:Schema.Types.ObjectId,
            ref:schematypes.auth
        },
        createdAT: {
            type: Number,
            required: true
        },
        updatedAT: {
            type: Number,
            required: true
        }
    }
);

let ProfileModel = model(schematypes.profile,ProfileSchema);

module.exports = ProfileModel;