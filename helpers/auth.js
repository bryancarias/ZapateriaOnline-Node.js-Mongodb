const ctrl = {}

ctrl.isAuth = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect('/')
    }
}
ctrl.isAuthAdmin = (req, res, next)=>{
    if(req.isAuthenticated()){
        if(req.user.isAdmin){
            return next()
        }else{
            res.redirect('/home')
        }
    }else{
        res.redirect('/')
    }
}

module.exports= ctrl