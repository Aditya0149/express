// dependacies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

// routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tounramentDetailsRouter = require('./routes/tournament-details');

// app
var app = express();

// moddlewares
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for logs
var myLogger = function (req, res, next) {
  console.log('LOGGED ',req.originalUrl)
  next()
}
app.use(myLogger);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tounramentDetails', tounramentDetailsRouter);

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
  res.send(err.message);
});

module.exports = app;
