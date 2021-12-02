var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/order');
var checkoutRouter = require('./routes/checkout');

var app = express();
//require Order
const Order = require("./models/order");
const OrderDB = require("./models/orderdb");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('orderdb', new OrderDB());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/public', express.static(__dirname + '/public'));

//
//
//add sesion
var session = require("express-session");
app.use(session({
  secret: "app",
  cookie: {
    maxAge: 60000 //one minute
  }
}))

app.use(function(req, res, next){
  // if (req.session.order == undefined){
  //   req.order = new Order();
  // } else {
  //   req.order = Object.assign(new Order(), req.session.order);
  // }
  req.orderdb = app.get('orderdb');
  next();
})
//
//

app.get('/api/get', require("./routes/api/get"));
//http://localhost:3000/api/get/ ==> show the database

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/checkout', checkoutRouter);

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
