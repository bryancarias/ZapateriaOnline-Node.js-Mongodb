const {User} = require('../models')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcrypt-nodejs')

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser( async(id,done)=> {
    const user =  await User.findById(id)
    done(null, user)
})

passport.use('local-sigup', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},async (req,email,password,done) => {
    const data = req.body
    const user = await  User.findOne({email:email})
    console.log(user)
    if(user){
        return done(null,false, req.flash('signupMessage','The Email is already Taken'))
    }else {
        const newUser = new User({
            nit:data.nit,
            firstname: data.firstname,
            lastname: data.lastname,
            telephone: data.telephone,
            address: data.address,
            email:email,
            password: encryptPassword(password) 
        })
        console.log(newUser)
        await newUser.save()
        done(null,newUser)
    }
}))

passport.use('local-signin', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email:email})
    if(!user){
        return done(null, false, req.flash('signinMessage','No user Found'))
    }
    if(!comparePasseword(password,user.password)){
        return done(null, false, req.flash('signinMessage','Incorecct Password'))
    }
    return done(null,user)
}))

const encryptPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const comparePasseword = (inPassword, dbPassword) => {
    return bcrypt.compareSync(inPassword,dbPassword)
}