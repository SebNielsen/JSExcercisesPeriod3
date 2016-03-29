var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
var session = require("express-session");
var RedisStore = require('connect-redis')(session);
var redis = require("redis");

var app = express();
var client = redis.createClient(18589, "pub-redis-18589.us-east-1-2.5.ec2.garantiadata.com", {no_ready_check: true});
client.auth('redis1234', function (err) {
    if (err) {
        console.log(err);
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'hasfkhsakfjdhsa',
    store: new RedisStore({host: "pub-redis-18589.us-east-1-2.5.ec2.garantiadata.com", port: 18589, client: client}),
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 60*1000}
}));

// routes
app.use('/', routes);

module.exports = app;