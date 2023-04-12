const { model, Schema } = require('mongoose');
const schematypes = require('./allSchemaTypes');

const TransactionSchema = Schema({
    cashing_system: {
        type: String,
        enum: ["HAND ON DELIVERY", "PAID"],
        default: 'PAID',
        required: true
    },
    paymentAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: function () { return this.cashing_system === 'PAID' }
    },
    transactionDate: {
        type: Date,
        required: true
    }
});

const AddressSchema = Schema({
    road: {
        type: String,
        required: true,
        minlength: [3, "road should be at least 3 charecters"],
        maxlength: [25, "road should be at most 25 charecters"],
    },
    city_vill: {
        type: String,
        required: true,
        minlength: [3, "city/village should be at least 3 charecters"],
        maxlength: [15, "city/village should be at most 15 charecters"],
    },
    upazilla: {
        type: String,
        required: true,
        minlength: [3, "upazilla should be at least 3 charecters"],
        maxlength: [15, "upazilla should be at most 15 charecters"],
    },
    district: {
        type: String,
        required: true,
        minlength: [3, "district should be at least 3 charecters"],
        maxlength: [15, "district should be at most 15 charecters"],
    },
    division: {
        type: String,
        required: true,
        minlength: [3, "division should be at least 3 charecters"],
        maxlength: [15, "division should be at most 15 charecters"],
    }
});

const OrderSchema = Schema(
    {
        status:{
            type:String,
            enum:['PENDING','REJECTED','COURIER','COMPLETED'],
            default:'PENDING',
            requiired:true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: schematypes.user,
            required: true
        },
        products: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: schematypes.product,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }],
        courier:String,
        comments: {
            type: String,
            minlength: [5, "Name should be at least 5 charecters"],
            maxlength: [80, "Name should be at most 80 charecters"],
        },
        phone: {
            type: String,
            required:true,
            minlength: 9,
            maxlength: 12,
        },
        transaction: {
            type: TransactionSchema,
        },
        address:{
            type: AddressSchema,
            required:true
        }
    },
    {
        timestapms:true,
    }
)

const OrderModel = model(schematypes.order, OrderSchema);
module.exports = OrderModel;