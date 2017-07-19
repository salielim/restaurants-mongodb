// Handles API routes

module.exports = function(app) {

    var Product = require('./api/products.controller');

    // Get the whole product list (based on filter criteria)
    app.get("/api/products", Product.retrieveAll);

    // Get a single product
    app.get("/api/products/:id", Product.retrieveOne);

    // Insert a new product
    app.post("/api/products", Product.insertOne);

    // Update a single product
    app.put("/api/products/:id", Product.updateOne);

    // Insert new grade for product
    app.put("/api/products/grades/:id", Product.updateGrade);

    // Delete a single product
    app.delete("/api/products/:id", Product.deleteOne);

    // Retrieve product types
    app.get("/api/products/category/type", Product.retrieveTypes);

};