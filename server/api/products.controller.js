var mongo = require('mongodb');
var config = require('../config');

// Retrieve all the products - GET /api/products
var retrieveAll = function () {
    return function (req, res) {
        // console.log("Route: GET /api/products");
        // Get the database object
        const db = req.app.locals.db;
        // *** Exercise ***
        // Requirements:
        // 1. Retrieve records from the restaurant list
        // 2. Projection - {name: 1, cuisine: 1, restaurant_id: 1, "address.street": 1, borough: 1}
        // 3. Limit to only 50 records
        // 4. Convert the records to array and send it back to client (Service: retrieveAll)
        // Validation:
        // 1. On the Search page, clicking on the "Retrieve Products" button will retrieve restaurant list

        // Enter your codes here
        try {
            db.collection(config.COLL_MAIN, function (err, collection) {
                if (err) {
                    res.status(500).send(err);
                };

                var query = {};
                var projection = { name: 1, cuisine: 1, restaurant_id: 1 }; // "address_street": ""

                collection.find(query).project(projection).limit(config.LIMIT).toArray()
                    .then(function (results) {
                        console.log(results);
                        res.json(results);
                    })
                    .catch(function (err) {
                        console.log("Query to Array Error: " + err);
                        res.status(500).send(err)
                    })
            })
        } catch (err) {
            console.log("Runtime errors for retrieve all: " + err);
            res.status(500).send(err);
        };
    }
};

// Retrieve one product using objectID - GET /api/products/:id
var retrieveOne = function () {
    return function (req, res) {
        console.log("Route: GET /api/products/:id");
        console.log("Object ID to retrieve: " + req.params.id);
        // Convert to object ID type
        var param = new mongo.ObjectID(req.params.id);
        // Get the database object
        const db = req.app.locals.db;

        // *** Exercise ***
        // Requirements:
        // 1. Retrieve a record from the restaurant list based on the object ID (URL parameter) that is passed
        // 2. Return all the fields back to client (Service: retrieveProduct(id))
        // Validation:
        // 1. On the Search page, clicking on "Name" field of the record
        // 2. You should see the detail page showing all the record information

        // Enter your codes here
        try {
            db.collection(config.COLL_MAIN, function (err, collection) {
                if (err) {
                    res.status(500).send(err);
                };

                var query = { "_id": param };
                var options = {};

                collection.findOne(query, options)
                    .then(function (results) {
                        console.log(results);
                        res.json(results);
                    })
                    .catch(function (err) {
                        console.log("Query to Array Error: " + err);
                        res.status(500).send(err)
                    })
            });

        } catch (err) {
            console.log("Runtime errors for retrieve one: " + err);
            res.status(500).send(err);
        }
    }
};

// Insert one product (Pass the product document using JSON body) - POST /api/products
var insertOne = function () {
    return function (req, res) {
        console.log("Route: POST /api/products");
        // Get the database object
        const db = req.app.locals.db;
        // Insert the new product (product JSON info in req.body)

        // *** Exercise ***
        // Requirements:
        // 1. Insert a record to the restaurant list based on the info send in req.body.newProduct
        // 2. Return status back to client (Service: addProduct(product))
        // Validation:
        // 1. On the Search page, click on the "Retrieve Products" button to retrieve restaurant list
        // 2. If you can't see the record, use the Postman to check as we have limit to 50 records

        // Enter your codes here
        try {
            db.collection(config.COLL_MAIN, function (err, collection) {
                if (err) {
                    res.status(500).send(err);
                };

                console.log("New product: ", req.body);

                var doc = JSON.parse(req.body.newProduct); 
                var options = {};

                collection.insertOne(doc, options)
                    .then(function (results) {
                        console.log(results);
                        res.json(results);
                    })
                    .catch(function (err) {
                        console.log("Query to Array Error: " + err);
                        res.status(500).send(err)
                    })
                })
            } catch (err) {
                console.log("Runtime errors for insert: " + err);
                res.status(500).send(err);
            }
        }
    };

// Update one product using objectID (set parameters in JSON body) - PUT /api/products
var updateOne = function () {
    return function (req, res) {
        // console.log("Route: PUT /api/products/:id");
        // console.log("Object ID to update: " + req.params.id);
        // Convert to object ID type
        var param = new mongo.ObjectID(req.params.id);
        var doc = JSON.parse(req.body.updateProduct); // convert json to object
        // Get the database object
        const db = req.app.locals.db;

        // *** Exercise ***
        // Requirements:
        // 1. Update a record on the restaurant list based on the info send in req.body.updateProduct
        //    and the id (URL parameter)
        // 2. Return status back to client (Service: updateProduct(id, product))
        // Validation:
        // 1. On the Search page, click on the "Retrieve Products" button to retrieve restaurant list
        // 2. Click on the Edit icon (pencil) of one record
        // 3. Update the record
        // 4. Return to the search page to check whether the record is updated

        // Enter your codes here
        try {
            db.collection(config.COLL_MAIN, function (err, collection) {
                if (err) {
                    res.status(500).send(err);
                };

                console.log("New product: ", req.body);

                var filter = { "_id": param };
                var update = { $set: doc };
                var options = { upsert: false };

                collection.updateOne(filter, update, options)
                    .then(function (results) {
                        console.log(results);
                        res.json(results);
                    })
                    .catch(function (err) {
                        console.log("Query to Array Error: " + err);
                        res.status(500).send(err)
                    })
            });

        } catch (err) {
            console.log("Runtime errors for retrieve all: " + err);
            res.status(500).send(err);
        }
    }
};

// Insert new grade for product using objectID (set parameters in JSON body) - PUT /api/products/grades
var updateGrade = function () {
    return function (req, res) {
        // console.log("Route: PUT /api/products/grades/:id");
        // console.log("Object ID to update: " + req.params.id);
        // Convert to object ID type
        var param = new mongo.ObjectID(req.params.id);
        var doc = JSON.parse(req.body.newGrades); // convert json to object
        // Get the database object
        const db = req.app.locals.db;

        // *** Exercise ***
        // Requirements:
        // 1. Insert a new record to the "grades" array
        // 2. Return only the new array item back to client (Service: addGrade(id, grades))
        //    This allows the client to insert the new array item to the view
        // Validation:
        // 1. On the Search page, click on the "Retrieve Products" button to retrieve restaurant list
        // 2. Click on the "Name" field of one record to go to details page
        // 3. Click on "Add Grade" button. Enter the grade and score for the new grade record.
        // 4. Click on "Submit Grade" button. If successful, you should see the new grade inserted
        // Hint: Use "findOneAndUpdate" method

        // Enter your codes here
        try {
            db.collection(config.COLL_MAIN, function (err, collection) {
                if (err) {
                    res.status(500).send(err);
                };

                var filter = { "_id": param };
                var update = { $push: { 'grades': doc } };
                var options = { upsert: false, returnOriginal: false };

                collection.findOneAndUpdate(filter, update, options)
                    .then(function (results) {
                        console.log(results);
                        newGrade = result.value.grades[result.value.grades.length - 1];
                        res.json(newGrade);
                    })
                    .catch(function (err) {
                        console.log("Error updating: " + err);
                        res.status(500).send(err)
                    })
            })
        } catch (err) {
            console.log("Runtime errors for retrieve all: " + err);
            res.status(500).send(err);
        }
    }
};

// Delete one product using objectID - DELETE /api/products/:id
var deleteOne = function () {
    return function (req, res) {
        // console.log("Route: DELETE /api/products/:id");
        // console.log("Object ID to delete: " + req.params.id);
        // Convert to object ID type
        var param = new mongo.ObjectID(req.params.id);
        // Get the database object
        const db = req.app.locals.db;

        // *** Exercise ***
        // Requirements:
        // 1. Delete a record on the restaurant list based on the object ID (URL parameter)
        // 2. Return status back to client (Service: deleteProduct(id))
        // Validation:
        // 1. On the Search page, click on the "Retrieve Products" button to retrieve restaurant list
        // 2. Click on the Delete icon (bin) of one record
        // 3. Record will be deleted

        // Enter your codes here
        var deleteOne = function () {
            return function (req, res) {
                console.log("Route: DELETE /api/products/:id");
                console.log("Object ID to delete: " + req.params.id);
                // Convert to object ID type
                var param = new mongo.ObjectID(req.params.id);
                // Get the database object
                const db = req.app.locals.db;
                try {
                    db.collection(config.COLL_MAIN, function (err, collection) {
                        // Hanlde collection err
                        if (err) {
                            res.status(500).send(err);
                        };
                        // Filter Operator and Options
                        var filter = { "_id": param };
                        var options = {};
                        // Delete one product
                        collection.deleteOne(filter, options)
                            .then(function (result) {
                                console.log(result.result);
                                res.json(result);
                            })
                            .catch(function (err) {
                                console.log("Error deleting: " + err);
                                res.status(500).send(err);
                            })
                    })
                } catch (err) {
                    console.log("Runtime errors for delete: " + err);
                    res.status(500).send(err);
                }
            }
        };
    }
};

        // Retrieve list of product types - GET /api/product/types
        var retrieveTypes = function () {
            return function (req, res) {
                // console.log("Route: GET /api/products/types");
                // Get the database object
                const db = req.app.locals.db;
                try {
                    db.collection(config.COLL_MAIN, function (err, collection) {
                        // Hanlde collection err
                        if (err) {
                            res.status(500).send(err);
                        };
                        // Field to find distinct value
                        var key = "cuisine";
                        // Query Operator
                        var query = {};
                        // Options
                        var options = {};
                        // Retrieve distinct types
                        collection.distinct(key, query, options)
                            .then(function (results) {
                                // console.log(results.sort());
                                res.json(results.sort());
                            })
                            .catch(function (err) {
                                console.log("Error retrieving distinct types: " + err);
                                res.status(500).send(err);
                            })
                    })
                } catch (err) {
                    console.log("Runtime errors for retrieve distinct types: " + err);
                    res.status(500).send(err);
                }
            }
        };

        // Export route handlers
        module.exports = {
            retrieveAll: retrieveAll(),
            retrieveOne: retrieveOne(),
            insertOne: insertOne(),
            updateOne: updateOne(),
            deleteOne: deleteOne(),
            retrieveTypes: retrieveTypes(),
            updateGrade: updateGrade()
        };

