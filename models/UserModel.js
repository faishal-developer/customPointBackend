const {model,Schema, default: mongoose} = require('mongoose');
const schematypes = require('./allSchemaTypes');

//hope: time is  saving in timestamps
const UserSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:[4,"Name should be at least 4 charecters"],
            maxlength:[20,"Name should be at most 20 charecters"],
        },
        email:{
            type:String,
            required:true,
            validate:{
                validator: function(v){
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(v);
                },
                message:(props)=>`Invalid email ${props.value}`
            }
        },
        password:{
            type:String,
            minlength:[6,'Password too short'],
        },
        roles:{
            type:[String],
            required:true,
            default:['USER']
        },
        isDeleted:Boolean,
        phone:{
            type:String,
            minlength:9,
            maxlength:12,
        },
        age:{
            type:Number,
            required:true,
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
            required:true
        },
        orderIds:[{
            type:Schema.Types.ObjectId,
            ref: schematypes.order
        }],
        searchList:{
            type: [String],
            maxlength:[15,"SearchList length must be between 15"]
        },
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

let UserMoel = model(schematypes.user,UserSchema);

module.exports = UserMoel;