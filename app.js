var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash')
var session = require('express-session')
var multer = require('multer')
var passport = require('passport')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var providersRouter = require('./routes/provider');
var categoriesRouter = require('./routes/category');
var toBuyRouter = require('./routes/toBuy');
var cartRouter = require('./routes/cart');

var app = express();
require('./database')
require('./controllers/passport-Auth')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const storage = multer.diskStorage({
  destination: path.join(__dirname,'public','imagen'),
  filename:(req,File, cb) => {
      cb(null, new Date().getTime() + path.extname(File.originalname))
  }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( multer({storage}).single('img'));
app.use(session({secret:'shoesshop',resave:false,saveUninitialized:false}))
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.providerMessage = req.flash('providerMessage')
  app.locals.categoryMessage = req.flash('categoryMessage')
  app.locals.tobuyMessage = req.flash('tobuyMessage')
  app.locals.signupMessage = req.flash('signupMessage')
  app.locals.signinMessage = req.flash('signinMessage')
  app.locals.userMessage = req.flash('userMessage')
  app.locals.user = req.user
  next()
})


app.use('/', indexRouter);
usersRouter(app)
providersRouter(app)
categoriesRouter(app)
toBuyRouter(app)
cartRouter(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
