var express = require('express');
var router = express.Router();
const provider = require('../controllers/provider')
const {isAuthAdmin} = require('../helpers/auth')

module.exports = app => {
    router.get('/admin/provider',isAuthAdmin,provider.get);
    router.post('/admin/provider',isAuthAdmin,provider.post);
    router.post('/admin/provider/:id',isAuthAdmin,provider.del);
    app.use(router)
}