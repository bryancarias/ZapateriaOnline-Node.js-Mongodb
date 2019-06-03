const {Schema, model} = require('mongoose')

const ProviderSchema = new Schema({
    name:{type: String, required:true},
    seller:{type: String, required:true},
    telephone:{type: String, required:true},
    minimum:{type: Number, required:true, default: 0},
})
module.exports = model('Provider',ProviderSchema)