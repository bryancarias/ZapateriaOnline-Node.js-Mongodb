const {Schema, model} = require('mongoose')

const CategoriaSchema = new Schema({
    name:{type: String,required:true}
})
module.exports = model('Category',CategoriaSchema)