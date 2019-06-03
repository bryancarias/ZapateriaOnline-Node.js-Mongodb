const ctrl = {}
const {Cart,Product} = require('../models')

ctrl.get = async (req,res,next) => {
    try {
        const carts = await Cart.find({iduser:req.user._id})
        const data = {
            title:'Shopping Carl',
            carts,
            cart: carts.length
        }
        res.render('cart',data)
    } catch (error) {
        next(error)
    }
}

ctrl.shoppingCart = async (req, res,next) => {
    try {
        const data = req.body
        const cart = new Cart({
            idproducto: data.product,
            iduser: data.user,
            avatar: data.avatar,
            name: data.name,
            price: data.price,
            quantity: data.quantity
        })
        await cart.save()
        res.redirect('/home')
    } catch (error) {
        next(error)
    }
}
ctrl.del = async (req,res,next) => {
    const del = await Cart.findByIdAndDelete(req.params.id)
    await del.save()
    res.redirect('/cart')
}

ctrl.post= async (req, res, next) => {
    try {
        const data = await Cart.find({iduser:req.user._id})
        await insert(data)
        await Cart.remove({iduser:req.user._id})
        res.redirect('/home')
    } catch (error) {
        next(error)
    }
}
let insert = async (data)=> {
    for (let i = 0; i < data.length; i++) {
        const product = await Product.findById(data[i].idproducto)
        product.sale.push({
            price:data[i].price,
            quantity: data[i].quantity,
            user: data[i].iduser
        }) 
        const update = await Product.findByIdAndUpdate(data[i].idproducto,{
            stock: parseInt(product.stock) - parseInt(data[i].quantity)
        })
        await product.save()      
        await update.save()      
    }
}
module.exports = ctrl
