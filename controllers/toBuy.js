const ctrl = {}
const {Product,Provider,Category} = require('../models')

ctrl.get = async (req, res, next) => {
    try {
        const tobuy = await Product.find().populate('toBuy.provider').populate('category')
        const provider = await Provider.find()
        const category = await Category.find()
        const data = {
            title:'toBuy',
            provider,
            category,
            tobuy
        }
        console.log(tobuy)
        res.render('tobuy',data)
    } catch (error) {
        next(error)
    }
}
ctrl.getBuy = async (req, res, next) => {
    try {
        const tobuy = await Product.find().populate('toBuy.provider').populate('category')
        const data = {
            title:'toBuy',
            tobuy
        }
        res.render('tobuy',data)
    } catch (error) {
        next(error)
    }
}
ctrl.getsales = async (req, res, next) => {
    try {
        const tobuy = await Product.find().populate('sale.user').populate('category')
        const data = {
            title:'toBuy',
            tobuy
        }
        res.render('sales',data)
    } catch (error) {
        next(error)
    }
}
ctrl.post = async ( req, res, next) => {
    try {
        console.log('entra')
        const data = req.body
        console.log('data')
        const newToBuy = new Product({
            avatar: req.file.filename,
            name: data.name,
            colour:data.colour,
            price: data.price,
            size: data.size,
            stock: data.quantity,
            category: data.category,
            toBuy:{
                price: data.priceBuy,
                quantity: data.quantity,
                provider: data.provider,
            }
        })
        await newToBuy.save()      
        req.flash('tobuyMessage','correct save')
        res.redirect('/admin/tobuy')
    } catch (error) {
        next(error)
    }
}
ctrl.getWarehouse = async (req, res, next) => {
    try {
        const tobuy = await Product.find()
        .populate({path:'toBuy.provider'})
        .populate('category')
        const data1 = {
            tobuy
        }
        res.render('warehouse',data1)
    } catch (error) {
            next(error)
    }
}
ctrl.getWarehouseId = async (req, res, next) => {
    try {
        let id = req.params.id
        const tobuy = await Product.findById(id)
        .populate({path:'toBuy.provider'})
        .populate('category')
        const provider = await Provider.find()
        const data1 = {
            tobuy,
            provider
        }
        res.render('warehouseUpdate',data1)
    } catch (error) {
            next(error)
    }
}

ctrl.postWarehouseUpdateStock = async( req, res, next) => {
    try {
        const data = req.body
        const product = await Product.findById(req.params.id)
        product.toBuy.push({
            price: data.price,
            quantity: data.quantity,
            provider: data.provider
        })
        const productUpdate = await Product.fiAndndByIdUpdate(req.params.id,{
            stock: parseInt(product.stock) + parseInt(data.quantity)
        })
        await product.save()
        await productUpdate.save()
        req.flash('tobuyMessage','correct save')
        res.redirect('/admin/warehouse/'+req.params.id)
    } catch (error) {
        next(error)
    }
}

ctrl.del = async (req, res, next) => {
    const dele = await Product.findByIdAndDelete(req.params.id)
    await dele.save()
    req.flash('tobuyMessage','correct save')
    res.redirect('/admin/warehouse')
}
module.exports = ctrl