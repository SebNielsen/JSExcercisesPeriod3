/**
 * Created by sebastiannielsen on 08/03/2016.
 */
var mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost:27017/data/db');
mongoose.connect('mongodb://test:test@ds023398.mlab.com:23398/first-mongodb');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
    "userEmail" : String,
    "userPassword" : String
};
// create model if not exists.
module.exports = mongoose.model('userLogin',userSchema);