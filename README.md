#Exam questions period 3

###1. Explain, generally, what is meant by a NoSQL database?

NoSQL can be hard to define, but most implemetations share these common characteristics

- Non relational
- Distributed
- Open source
- Horizontally scalable
- Schema-less

A NoSQL (originally referring to "non SQL" or "non relational") database provides a mechanism
for storage and retrieval of data which is modeled in means other than the tabular relations used
in relational databases. NoSQL databases are increasingly used in big data and real-time web
applications. NoSQL systems are also sometimes called "Not only SQL" to emphasize that they may
support SQL-like query languages. The data structures used by NoSQL databases (e.g. key-value, wide
column, graph, or document) are different from those used by default in relational databases, making
some operations faster in NoSQL. The particular suitability of a given NoSQL database depends on the
problem it must solve. Sometimes the data structures used by NoSQL databases are also viewed as
"more flexible" than relational database tables.

###2. Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional
Relational SQL Database like MySQL?

#####Pros:
- Fast Perfomance
- Horizontally scalable (Keep adding more computers to the cluster to scale the performance and storage)
- More flexible (The Documents doesn't need to have the same number of fields, just save whatever you want)

#####Cons:
- No Joins support
- Roll back on multiple transactions isn't supported
- Doesn't offer ACID guarantees
- MongoDB has a max size limit for documents

###3. Explain how databases like MongoDB and redis would be classified in the NoSQL world?

#####MongoDB:
MongoDB is a document-oriented cross platform database. One of the most popular ways of storing data is a document data model,
where each record and its associated data is thought of as a “document”. In a document database, such as MongoDB, everything
related to a database object is encapsulated together.

Storing data in this way has the following advantages:

Documents are independent units which makes performance better (related data is read contiguously off disk) and makes it easier
to distribute data across multiple servers while preserving its locality.

Application logic is easier to write. You don’t have to translate between objects in your application and SQL queries, you can
just turn the object model directly into a document.

Unstructured data can be stored easily, since a document contains whatever keys and values the application logic requires. In
addition, costly migrations are avoided since the database does not need to know its information schema in advance.

Document databases generally have very powerful query engines and indexing features that make it easy and fast to execute many
different optimized queries. The strength of a document database’s query language is an important differentiator between these
databases.


#####Redis:
Redis is a key-value store. Redis is an open source (BSD licensed), in-memory data structure store, used as database, cache and
message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps,
hyperloglogs and geospatial indexes with radius queries. In order to achieve its outstanding performance, Redis works with an
in-memory dataset. Depending on your use case, you can persist it either by dumping the dataset to disk every once in a while,
or by appending each command to a log. Since data is stored in memory the access is extremely fast.

###4. Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB?

Mongoose is an object modeling tool for MongoDB and Node.js, somehow similar to a ORM tool as we know. Mongoose provides a
straight-forward, schema-based solution to modeling your application data and includes, out of the box:
- Schemas
- Built-in type casting
- Validation (also include with plain MongoDB as of v. 3.2)
- Query building
- Business logic hooks (middleware)

Mongoose provides a validation and modeling layer to the app which will make a typical app  much easier and faster to write
if you use Mongoose and not native driver.

###5. Explain, using relevant examples, the strategy for querying MongoDB (all CRUD operations)?

The code below demonstrates how to query all CRUD operations.

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

###6. Demonstrate, using a REST-API, how to perform all CRUD operations on a MongoDB?

See the firstMeanApplicationBackend folder

###7. Explain the benefits from using Mongoose, and provide an example involving all CRUD operations?

See the firstMeanApplicationBackend folder

###8. Explain how redis "fits" into the NoSQL world, and provide an example of how to use it?
One of the most apparent use cases for Redis is using it as a Session Store. The advantages of using Redis over other
session stores, is that Redis offers persistence. While maintaining a cache isn't typically mission critical with regards
to consistency, most users wouldn't exactly enjoy if all their cart sessions went away.

For an example see the firstRedis folder.

###9. Explain, using a relevant example, how redis (or a similar) can increase scalability (drastic) for a server using server side sessions?
When your customer or user logs in, they authenticate and receive a token. This token then allows them to interact
with any server in your web tier - the token is sent back and forth each time. There is no need for a "master" server
and "slave" servers, because each server is the same. This allows you to scale horizontally very easily. The session
data is then stored in a fast database like Redis.

###10. Explain, using a relevant example, a full MEAN application including relevant test cases to test the REST-API?
See the firstMeanApplicationBackend folder.
See the firstMeanApplicationFrontend folder.
