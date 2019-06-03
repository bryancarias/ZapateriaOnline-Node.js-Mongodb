var express = require('express');
var router = express.Router();
const category = require('../controllers/category')
const {isAuthAdmin} = require('../helpers/auth')

module.exports = app =>{
    router.get('/admin/category',isAuthAdmin,category.get);
    router.post('/admin/category',isAuthAdmin,category.post);
    router.post('/admin/category-delete/:id',isAuthAdmin,category.detele);
    app.use(router)
}
