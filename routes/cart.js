const router = require('express').Router()
const cart = require('../controllers/cart')
const {isAuth} = require('../helpers/auth')
module.exports = app => {
    router.get('/cart',isAuth,cart.get)
    router.post('/cart',isAuth,cart.post)
    router.post('/shoppingcart',isAuth,cart.shoppingCart)
    router.post('/car-delete/:id',isAuth,cart.del)
    app.use(router)
}