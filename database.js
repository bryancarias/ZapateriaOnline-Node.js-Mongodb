const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/shoesshop',{
    useCreateIndex: true,
    useNewUrlParser:true
    
})
.then(connect => console.log(`Connect Mongodb`))
.catch(er => console.error(er)) 