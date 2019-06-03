const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    nit:{type: String, required:true},
    firstname:{type: String, required: true},
    lastname:{type: String, required: true},
    telephone:{type: String, required: true},
    address:{type: String, required: true},
    email:{type: String,unique: true, required: true},
    password:{type: String, required: true},
    isAdmin:{type: Boolean, required: true,default: true}
})
module.exports = model('User',usuarioSchema)