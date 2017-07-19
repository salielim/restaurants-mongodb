(function() {
    'use strict';

    angular
        .module('Shopping')
        .controller('ProductsAddController', ProductsAddController);

    ProductsAddController.$inject = ['$state', 'ProductsService'];
    function ProductsAddController($state, ProductsService) {

        // Declares the var vm (for ViewModel) and assigns it the object this. Any function or variable that you attach
        // to vm will be exposed to callers of this controller
        var vm = this;

        // Exposed data models -----------------------------------------------------------------------------------------
        vm.newProduct = {};
        vm.coord = {};
        
        // Exposed functions (Called from View) ------------------------------------------------------------------------
        vm.goBack = goBack;
        vm.addProduct = addProduct;
        
        // Initializations (Functions that are run when view/html is loaded) -------------------------------------------

        // Function declaration and definition -------------------------------------------------------------------------

        // Add Product
        function addProduct() {
            console.log("* ProductsController: addProduct");
            vm.newProduct.address.coord = [];
            vm.newProduct.address.coord.push(vm.coord.lng);
            vm.newProduct.address.coord.push(vm.coord.lat);
            console.log("Restaurant Record: ",vm.newProduct);
            ProductsService
                .addProduct(vm.newProduct)
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    vm.result = data;
                    goBack();
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                });
        }
    
        // Go back to product list page
        function goBack() {
            console.log("* ProductsController: goBack");
            $state.go("products");
        }
        
    }
})();