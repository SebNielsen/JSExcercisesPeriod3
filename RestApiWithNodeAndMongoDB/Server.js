/**
 * Created by sebastiannielsen on 08/03/2016.
 */

var express = require("express");
var bodyParser = require("body-parser");
var routes = require('./routes/routes');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use('/api',routes);

app.listen(3000);
console.log("Listening on PORT 3000");