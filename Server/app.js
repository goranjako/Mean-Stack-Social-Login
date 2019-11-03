var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var bodyPaser = require('body-parser');
var passport = require('passport');
var config = require('./config/database');
var mongoose = require('mongoose');
var helmet = require('helmet');
var cors = require('cors');
var app = express();


mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useCreateIndex: true, useUnifiedTopology: true,useNewUrlParser: true })
  .then(function() { console.log('connection successful');})
  .catch(function(err) { console.error(err);});

  var indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['token']
};
app.use(cors(corsOption));

app.use(logger('dev'));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(helmet());
app.use(bodyPaser.urlencoded({ extended: false }));
// Passport middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);


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
