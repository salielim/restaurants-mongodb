(function() {
    'use strict';

    angular
        .module('Shopping')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$state', 'CommonService','ProductsService'];
    function ProductsController($state, CommonService, ProductsService) {

        // Declares the var vm (for ViewModel) and assigns it the object this. Any function or variable that you attach
        // to vm will be exposed to callers of this controller
        var vm = this;

        // Exposed data models -----------------------------------------------------------------------------------------
        vm.status = {message: "", code: 0}; // Status
        vm.result = []; // result
        vm.product = {};
        vm.searchCriteria = "";
        // vm.listInfo = ['pricing','shipping','details'];
        vm.types = [];

        // Exposed functions (Called from View) ------------------------------------------------------------------------
        vm.retrieveAll = retrieveAll;
        vm.deleteProduct = deleteProduct;
        vm.addProduct = addProduct;
        vm.viewProduct = viewProduct;
        vm.updateProduct = updateProduct;
        vm.passProduct = passProduct;
        vm.isArray = angular.isArray;
        vm.isObject = angular.isObject;

        // Initializations (Functions that are run when view/html is loaded) -------------------------------------------
        // initDetails();
        retrieveTypes();
        // retrieveAll();

        // Function declaration and definition -------------------------------------------------------------------------
        // Retrieve all products
        function retrieveAll() {
            console.log("* ProductsController: retrieveAll");
            ProductsService
                .retrieveAll()
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    vm.result = data;
                    // vm.result.sort(CommonService.sortCusine);
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                    // console.log("Controller Error 2:", JSON.stringify(err));
                });
        }

        // Go to Add Product Page
        function addProduct(product) {
            console.log("* ProductsController: addProduct");
            $state.go("register");
        }

        // Go to Add Product Page
        function viewProduct(_id) {
            console.log("* ProductsController: viewProduct");
            $state.go("detail", {_id: _id});
        }

        // Go to Update Product Page
        function updateProduct(_id) {
            console.log("* ProductsController: updateProduct");
            console.log("ID: ", _id);
            $state.go("update", {_id: _id});
        }

        // Delete product
        function deleteProduct(product) {
            console.log("* ProductsController: deleteProduct");
            ProductsService
                .deleteProduct(product._id)
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    // Remove product from vm.result that contains the product list
                    var index = vm.result.indexOf(product);
                    vm.result.splice(index, 1);
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                });
        }

        // Get the product and perform listing 
        function passProduct(product) {
            console.log("* ProductsController: passProduct");
            vm.product = product;
        }

        // Retrieve the product types
        function retrieveTypes() {
            console.log("* ProductsController: retrieveTypes");
            ProductsService
                .retrieveTypes()
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    vm.types = data;
                    vm.types.unshift("");
                })
                .catch(function (err) {
                    console.log("> Controller Error 1:", err);
                    // console.log("Controller Error 2:", JSON.stringify(err));
                });
        }
    }

})();