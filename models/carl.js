const {Schema, model} = require('mongoose')
const Types = Schema.Types

const cartSchema = new Schema({
    idproducto:{type:Types.ObjectId},
    iduser:{type:Types.ObjectId},
    avatar:{type:Types.String},
    name:{type:Types.String},
    price:{type:Types.Number},
    quantity:{type:Types.Number, default:1},
})
module.exports = model('Cart',cartSchema)