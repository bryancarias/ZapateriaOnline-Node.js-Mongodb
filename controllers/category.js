const ctrl = {}
const {Category}= require('../models')
ctrl.get = async (req, res, next) => {
    try {
        const category = await Category.find()
        const data = {
            title:'Category',
            category
        }
        res.render('category',data)
    } catch (error) {
        next(error)
    }
}
ctrl.post = async (req, res, next) => {
    try {
        const data = req.body
        const newCategory = new Category({
            name: data.name
        })
        await newCategory.save()
        req.flash('categoryMessage','correct save')
        res.redirect('/admin/category')
    } catch (error) {
        next(error)
    }
}
ctrl.detele = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        await category.save()
        req.flash('categoryMessage','Delete save')
        res.redirect('/admin/category')
    } catch (error) {
        next(error)
    }
}
module.exports = ctrl