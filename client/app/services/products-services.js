(function() {
    'use strict';

    angular
        .module('Shopping')
        .service('ProductsService', ProductsService);

    ProductsService.$inject = ['$http','$q'];
    function ProductsService ($http, $q) {

        // Declares the var service and assigns it the object this (in this case, the ShopService). Any function or
        // variable that you attach to service will be exposed to callers of ShopService
        var service = this;

        // EXPOSED DATA MODELS -----------------------------------------------------------------------------------------

        // EXPOSED FUNCTIONS -------------------------------------------------------------------------------------------
        service.retrieveAll = retrieveAll;
        service.retrieveTypes = retrieveTypes;
        service.addProduct = addProduct;
        service.addGrade = addGrade;
        service.retrieveProduct = retrieveProduct;
        service.updateProduct = updateProduct;
        service.deleteProduct = deleteProduct;

        // FUNCTION DECLARATION AND DEFINITION -------------------------------------------------------------------------

        // retrieveAll: retrieves product list from the server via HTTP GET.
        // Parameters: None. Returns: Promise object
        function retrieveAll (){
            console.log("* ProductsService: retrieveAll");
            var defer = $q.defer();
            // Call Get Product List API on Express
            $http.get("/api/products", {
            }).then(function (results) {
                console.log("> Service Result:", results);
                // Return result data to controller
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log("> Service Error:", err);
                // Return error to controller
                return defer.reject(err);
            });
            return defer.promise;
        };

        // retrieveProduct: retrieves product from the server via HTTP GET.
        // Parameters: _id. Returns: Promise object
        function retrieveProduct(id){
            console.log("* ProductsService: retrieveProduct");
            var defer = $q.defer();
            // Call Get Product List API on Express
            $http.get("/api/products/" + id, {
            }).then(function (results) {
                console.log("> Service Result:", results);
                // Return result data to controller
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log("> Service Error:", err);
                // Return error to controller
                return defer.reject(err);
            });
            return defer.promise;
        };

        // addProduct: add product to the server via HTTP POST.
        // Parameters: product body. Returns: Promise object
        function addProduct(product) {
            console.log("* ProductsService: addProduct");
            var newProduct = JSON.stringify(product); // convert object to json
            var defer = $q.defer();
            // Call Delete Product API on Express
            $http.post("/api/products", {
                newProduct
            }).then(function (results) {
                console.log("> Service Result:", results);
                // Return result data to controller
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log("> Service Error:", err);
                // Return error to controller
                return defer.reject(err);
            });
            return defer.promise;
        };

        // updateProduct: update product to the server via HTTP POST.
        // Parameters: product body. Returns: Promise object
        function updateProduct(id, product) {
            console.log("* ProductsService: updateProduct");
            delete product["_id"]; 
            console.log("Update Product: ",product);
            var updateProduct = JSON.stringify(product); // convert object to json
            var defer = $q.defer();
            // Call Delete Product API on Express
            $http.put("/api/products/" + id, {
                updateProduct
            }).then(function (results) {
                console.log("> Service Result:", results);
                // Return result data to controller
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log("> Service Error:", err);
                // Return error to controller
                return defer.reject(err);
            });
            return defer.promise;
        };

        // addGrade: add grade for product to the server via HTTP POST.
        // Parameters: id and grading. Returns: Promise object
        function addGrade(id, grades) {
            console.log("* ProductsService: addGrade");
            var newGrades = JSON.stringify(grades); // convert object to json
            var defer = $q.defer();
            // Call Delete Product API on Express
            $http.put("/api/products/grades/" + id, {
                newGrades
            }).then(function (results) {
                console.log("> Service Result:", results);
                // Return result data to controller
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log("> Service Error:", err);
                // Return error to controller
                return defer.reject(err);
            });
            return defer.promise;
        };

        // deleteProduct: deletes product from the server via HTTP DELETE.
        // Parameters: None. Returns: Promise object
        function deleteProduct(id) {
            console.log("* ProductsService: deleteProduct");
            var defer = $q.defer();
            // Call Delete Product API on Express
            $http.delete("/api/products/" + id, {
            }).then(function (results) {
                console.log("> Service Result:", results);
                // Return result data to controller
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log("> Service Error:", err);
                // Return error to controller
                return defer.reject(err);
            });
            return defer.promise;
        };
        
        // retrieveTypes: retrieves product types from the server via HTTP GET.
        // Parameters: None. Returns: Promise object
        function retrieveTypes (){
            console.log("* ProductsService: retrieveTypes");
            var defer = $q.defer();
            // Call Get User Account API on Express
            $http.get("/api/products/category/type", {
            }).then(function (results) {
                console.log("> Service Result:", results);
                // Return result data to controller
                return defer.resolve(results.data);
            }).catch(function (err) {
                console.log("> Service Error:", err);
                // Return error to controller
                return defer.reject(err);
            });
            return defer.promise;
        };

        // function retrieveAll() {
        //     return $http({
        //         method: 'GET',
        //         url: '/api/products'
        //     });
        // }

    }
        
})();