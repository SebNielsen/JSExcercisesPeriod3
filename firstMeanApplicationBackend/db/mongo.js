var mongoose = require("mongoose");

var connect = function(url) {
    mongoose.connect(url);
};
var get = function() {
    var jokeSchema  = {
        "joke" : String,
        "type" : String,
        "reference" : {},
        "lastEdited" : String
    };
    return mongoose.model('jokes',jokeSchema);
};

module.exports.connect = connect;
module.exports.get = get;
