require('dotenv').config()
var logger = require('./utils/logger');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
//route middlewares
var index = require('./routes/index');
var users = require('./routes/users');
var load_more = require('./routes/load_more');
var app = express();

//global usage
storage = require('node-persist');
GitHubApi = require("github");
github = new GitHubApi({
});

// github auth for entire app
github.authenticate({
  type: 'oauth',
  key: process.env.key,
  secret: process.env.secret
})

//logger setup
logger.debug("Overriding 'Express' logger");
app.use(require('morgan')({ "stream": logger.stream }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set up middlewares for each route
app.use('/', index);
app.use('/users', users);
app.use('/load_more', load_more);

// START - GENERATED CODE

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

// END - GENERATERED CODE
