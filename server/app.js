var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var dote = require('dotenv').config();

if ( process.env.NODE_ENV == 'test' ) {
  mongoose.connect('mongodb://admin:abc123@ds245971.mlab.com:45971/article-blog-test', { useNewUrlParser: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('connected to testing');
    // we're connected!
  });
} else {
  mongoose.connect('mongodb://admin:abc123@ds125482.mlab.com:25482/blogger-new', { useNewUrlParser: true });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('connected to development');
    // we're connected!
  });
}

var blogRouter = require('./routes/blog');
var usersRouter = require('./routes/users');
var commentRouter = require('./routes/comment');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/blog', blogRouter);
app.use('/users', usersRouter);
app.use('/comment', commentRouter);

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
