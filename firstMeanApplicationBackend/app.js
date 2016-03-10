/**
 * Created by sebastiannielsen on 08/03/2016.
 */
var express = require("express");
var bodyParser = require("body-parser");
var routes = require('./routes/routes');
var app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, CONNECT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api', routes);

module.exports = app;