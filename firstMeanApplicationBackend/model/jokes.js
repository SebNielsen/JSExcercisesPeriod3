/**
 * Created by sebastiannielsen on 08/03/2016.
 */
var connection = require("../db/mongo");
var mongoDB = connection.get();


exports.addJoke = function(joke,callback){
    var db = new mongoDB();
    db.joke = joke.joke;
    db.type = joke.type;
    db.reference = joke.reference;
    db.lastEdited = getCurrentDate();

    // save() will run insert() command of MongoDB.
    // it will add new data in collection.
    db.save(function(err) {
        if (err) {
            callback(err);
        }
        callback(null, "Data added");
    });
};

exports.allJokes =  function(callback){
    mongoDB.find({},function(err, data){
        // Mongo command to fetch all data from collection.
        if(err) {
            callback(err);
        }
        callback(null, data);
    });
};

exports.findJoke = function(id, callback){
    // This will run Mongo Query to fetch data based on ID.
    mongoDB.findById(id,function(err, data){
        if(err) {
            callback(err)
        }
        callback(null, data);
    });
};

exports.editJoke = function(jokeToEdit,changes,callback) {
    mongoDB.findById(jokeToEdit, function (err, data) {
        if (err) {
            callback(err);
        } else {
            // we got data from Mongo.
            // change it accordingly.
            if (changes.joke !== undefined) {
                // case where the joke needs to be updated.
                data.joke = changes.joke;
            }
            if (changes.type !== undefined) {
                // case where the type needs to be updated
                data.type = changes.type;
            }
            if (changes.reference !== undefined) {
                // case where the reference needs to be updated
                data.reference = changes.reference;
            }
            //set the lastEdited to the current date
            data.lastEdited = getCurrentDate();

            // save the data
            data.save(function (err) {
                if (err) {
                    callback(err);
                }
                callback(null, "Data is updated for " + jokeToEdit)
            });
        }
    });
};

exports.deleteJoke = function(id, callback){
    mongoDB.findById(id, function (err, data) {
        if (err) {
            callback(err);
        } else {
            // data exists, remove it.
            mongoDB.remove({_id: id}, function (err) {
                if (err) {
                    callback(err);
                }
                callback(null, "Data associated with " + id + " is deleted");
            });
        }
    });
};

exports.randomJoke =  function(callback){
    mongoDB.find({},function(err, data){
        // Mongo command to fetch all data from collection.
        if(err) {
            callback(err);
        }
        callback(null, data[Math.floor((Math.random() * data.length))]);
    });
};


function getCurrentDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = dd+'/'+mm+'/'+yyyy;
    return today;
};
