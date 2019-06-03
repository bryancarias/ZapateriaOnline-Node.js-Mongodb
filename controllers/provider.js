const ctrl = {}
const {Provider } = require('../models')
ctrl.get = async(req, res, next) => {
    const data = {
        title:'Provider',
        provider:await Provider.find()
    }
    res.render('provider',data)
}

ctrl.post = async (req, res) => {
    const data = req.body
    const newProvider = new Provider({
        name: data.name,
        seller: data.seller,
        telephone: data.telephone,
        minimum: data.minimum
    })
    await newProvider.save()
    req.flash('providerMessage','correct save')
    res.redirect('/admin/provider')
}
ctrl.del = async (req, res) => {
    const delte = await  Provider.findByIdAndDelete(req.params.id)
    await delte.save()
    req.flash('providerMessage','Delete save')
    res.redirect('/admin/provider')
}

module.exports = ctrl