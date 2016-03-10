/**
 * Created by sebastiannielsen on 08/03/2016.
 */
var express = require('express');
var jokes = require('../model/jokes');
var router = express.Router();

router.route("/jokes")
    .get(function(req,res){
        var response = {};
        jokes.allJokes(function(err, data){
            if(err){
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"data" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res) {
        var newJoke = {"joke" :req.body.joke, "type":req.body.type, "reference" : req.body.reference};
        var response = {};
        jokes.addJoke(newJoke, function (err, message) {
            if (err) {
                response = {"error": true, "message": "Error adding data"};
            } else {
                response = {"error": false, "message": message};
            }
            res.json(response);
        });
    });

router.route("/joke/:id")
    .get(function(req,res) {
        var jokeToFind = req.params.id;
        var response = {};

        jokes.findJoke(jokeToFind, function(err, data){
           if(err){
               response = {"error" : true,"message" : "Error fetching data"};
           } else {
               response = {"error" : false,"data" : data};
           }
            res.json(response);
        });
    })

    .put(function(req,res) {
        var jokeToEdit = req.params.id;
        var changes = req.body;
        var response = {};

        jokes.editJoke(jokeToEdit, changes, function (err, message) {
            if (err) {
                response = {"error": true, "message": "Error updating data"};
            } else {
                response = {"error": false, "message": message};
            }
            res.json(response);
        });
    })

    .delete(function(req,res) {
        var jokeToRemove = req.params.id;
        var response = {};
        jokes.deleteJoke(jokeToRemove, function(err, message){
           if(err){
               response = {"error": true, "message": "Error deleting data"};
           } else {
               response = {"error": false, "message": message};
           }
           res.json(response);
        });

    });

router.route("/jokes/random")
    .get(function(req,res){
        var response = {};
        jokes.randomJoke(function(err, data){
            if(err){
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"data" : data};
            }
            res.json(response);
        });
    });

module.exports = router;