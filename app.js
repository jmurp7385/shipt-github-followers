var logger = require('./utils/logger');
var express = require('express');
var path = require('path');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//global usage
storage = require('node-persist');
GitHubApi = require("github");
github = new GitHubApi({
});

//set github auth for app
github.authenticate({
  type: 'oauth',
  key: '39a51acb8094238c28e1',
  secret: 'cf04c6178de6860537a0c44151ea43200149daef'
})

var index = require('./routes/index');
var users = require('./routes/users');
var load_more = require('./routes/load_more');

var app = express();

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


app.use('/', index);
app.use('/users', users);
app.use('/load_more', load_more);

// BOILERPLATE

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
