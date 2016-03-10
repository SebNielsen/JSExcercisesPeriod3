/**
 * Created by sebastiannielsen on 09/03/2016.
 */
var expect = require('chai').expect;
var request = require("request");
var http = require("http");
var app = require('./../app');
var db = require("../db/mongo");
var server;
var TEST_PORT = 3300;

beforeEach(function(done){
    server = http.createServer(app);
    server.listen(TEST_PORT,function(){
        db.connect("mongodb://test:test@ds023398.mlab.com:23398/first-mongodb");
        done();
    })
});

afterEach(function(done){
    server.close();
    done();
});

describe("GET: /api/jokes/random", function(){
    var options = {
        url: "http://localhost:" + TEST_PORT+ "/api/jokes/random",
        method: "GET",
        json: true
    };

    it("Should get a random Joke object", function(done){
        request(options, function (error, res, body){
            var data = body.data;
            expect(data.joke).to.be.a("string");
            expect(data.type).to.equal("alcohol");
            done();
        })
    })
});

describe("GET: /api/jokes", function(){
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/jokes",
        method: "GET",
        json: true
    };

    it("Should get array with all jokes", function(done){
        request(options, function (error, res, body){
            var jokesArray = body.data;
            expect(jokesArray.length).to.equal(2);
            done();
        })
    })
});
