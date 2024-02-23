var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const profilesRouter = require('./routes/profiles');
const mongoClient = require('./mongo');
const cors = require('cors');
const corsOptions = {
  origin: [
    'http://127.0.0.1:4200',
    'http://localhost:4200',
  ],
}

var app = express();

// cors setup
app.use(
  cors(corsOptions)
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', profilesRouter);

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

(async () => {
  try {
    await mongoClient.connect();
  } catch(err) {
    return console.log(err);
  } 
})();

module.exports = app;
