const {Schema, model} = require('mongoose')
const Types = Schema.Types
const Categoria = model('Category')
const User = model('User')
const Provider = model('Provider')

const ProductoSchema = new Schema({
    avatar:{type:String, required:true},
    name:{type:String, required:true},
    colour:{type:String, required:true},
    price:{type: Number, required:true},
    size:{type:String, required:true},
    stock:{type:Number, required:true},
    category:{type: Types.ObjectId, ref: Categoria, required:true},
    sale:[{
        price:{type: Number, required:true, default:0},
        date:{type: Date, required:true, default: Date.now()},
        quantity:{type: Number, required:true, default:0 },
        user: {type: Types.ObjectId, ref: User} 
    }],
    toBuy:[{
        price:{type: Number, required:true, default: 0},
        date:{type: Date, required:true, default: Date.now()},
        quantity:{type: Number, required:true, default: 0},
        provider:{type:Types.ObjectId, ref:Provider, required:true},
    }]
})
module.exports = model('Product', ProductoSchema)