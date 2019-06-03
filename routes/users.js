var express = require('express');
var router = express.Router();
var passport = require('passport')
var user = require('../controllers/user')
var {isAuth, isAuthAdmin} = require('../helpers/auth')
module.exports = app => {
  router.get('/signup',user.getSignUp)
  router.get('/signin',user.getSignIn)
  router.get('/logout',isAuth,user.getLogout)
  router.get('/admin',isAuthAdmin,user.getAdmin)
  router.get('/admin/user',isAuthAdmin,user.getUserAdmin)
  router.post('/admin/user/:id',isAuthAdmin,user.postUserAdmin)
  router.post('/admin/userdelete/:id',isAuthAdmin,user.postUserDelete)
  router.get('/home',isAuth,user.gethome)
  router.post('/signup', passport.authenticate('local-sigup',{
      successRedirect:'/home',
      failureRedirect: '/signup',
      failureFlash: true
  }))
  router.post('/signin', passport.authenticate('local-signin',{
      successRedirect:'/home',
      failureRedirect: '/signin',
      failureFlash: true
  }))
  app.use(router)
} 

    