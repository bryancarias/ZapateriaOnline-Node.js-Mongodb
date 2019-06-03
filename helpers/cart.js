const ctrl = {}
let array = []
ctrl.shoppingCart = (producto,user) => {
    array.push({producto,user})
}
module.exports = ctrl
