var express = require('express');
var router = express.Router();
const toBuy = require('../controllers/toBuy')
const {isAuthAdmin} = require('../helpers/auth')

module.exports = app => {
    router.get('/admin/warehouse',isAuthAdmin,toBuy.getWarehouse);
    router.post('/admin/warehouse-delete/:id',isAuthAdmin,toBuy.del);

    router.get('/admin/sales',toBuy.getsales);

    router.get('/admin/warehouse/:id',isAuthAdmin,toBuy.getWarehouseId);
    router.post('/admin/warehouse/:id',isAuthAdmin,toBuy.postWarehouseUpdateStock);
    
    router.get('/admin/tobuy',isAuthAdmin,toBuy.get);
    router.post('/admin/tobuy',isAuthAdmin,toBuy.post);
    app.use(router)
}