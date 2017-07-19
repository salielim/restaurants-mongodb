module.exports = function(app) {

    var assert = require('assert');
    // Read configurations
    var config = require('./config');
    // Load MongoDB Nodejs Driver - MongoClient
    var MongoClient = require('mongodb').MongoClient;
    // MongoDB Connection URL
    // var url = config.MONGO_URI;
    var url = config.DATABASE_URI;
    // var url = "mongodb://localhost/michelin";
    console.log("url: " + url);
    // Create the database connection
    MongoClient.connect(url, {  
        poolSize: 10
        // other options can go here
    },function(err, db) {
        assert.equal(null, err);
        app.locals.db = db; // access using req.app.local.db at the routes
    });
}