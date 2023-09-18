const {model,Schema} = require('mongoose');
const schematypes = require('./allSchemaTypes');

//hope: time is  saving in timestamps
const AuthSchema = new Schema(
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
                    // eslint-disable-next-line no-useless-escape
                    return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(v);
                },
                message:(props)=>`Invalid email ${props.value}`
            }
        },
        roles:{
            type:[String],
            required:true,
            default:['USER']
        },
        isDeleted:Boolean,
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

let AuthModel = model(schematypes.auth,AuthSchema);


module.exports = AuthModel;
