const ctrl = {}
const {Product,Category,Provider,User,Cart} =require('../models')
ctrl.getSignIn = (req, res, next) => {
    try {
        res.render('signip',{title:'Sign In'})
    } catch (error) {
        next(error)
    }
}
ctrl.getUserAdmin = async (req, res, next) => {
    try {
        const data = {
            title:'User',
            User : await User.find()
        }
        res.render('user',data)
    } catch (error) {
        next(error)
    }
}
ctrl.postUserAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const userUpdate = await User.findByIdAndUpdate(req.params.id,{
            isAdmin: await rest(user)
        })
        await userUpdate.save()
        req.flash('userMessage','Update correct')
        res.redirect('/admin/user')
    } catch (error) {
        next(error)
    }
}
ctrl.postUserDelete = async (req, res, next) => {
    try {
        const userUpdate = await User.findByIdAndDelete(req.params.id)
        await userUpdate.save()
        req.flash('userMessage','delete correct')
        res.redirect('/admin/user')
    } catch (error) {
        next(error)
    }
}
ctrl.getSignUp = (req, res, next) => {
    try {
        res.render('signup',{title:'SignUp'})
    } catch (error) {
        next(error)
    }
}
ctrl.gethome = async(req, res, next) => {
    try {
        const product = await Product.find()
        const cart = await Cart.countDocuments({iduser:req.user.id})
        const data = {
            title:'Welcome Zapateria',
            product,
            cart
        }
        res.render('home',data)
        
    } catch (error) {
        next(error)
    }
}
ctrl.getAdmin = async (req, res, next) => {
    try {
        const data = {
            product: await Product.countDocuments(),
            provider: await Provider.countDocuments(),
            User: await User.countDocuments(),
            Category: await Category.countDocuments()
        }
        res.render('admin',data)
        
    } catch (error) {
        next(error)
    }
}

let rest = (user) => {
    if(user.isAdmin){
        return false
    }else{
        return true
    }
}
ctrl.getLogout = (req, res, next) => {
    req.logout()
    res.redirect('/')
}
module.exports = ctrl