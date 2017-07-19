(function() {
    'use strict';

    angular
        .module('Shopping')
        .controller('ProductsUpdateController', ProductsUpdateController);

    ProductsUpdateController.$inject = ['$state', '$stateParams', '$filter', 'ProductsService'];
    function ProductsUpdateController($state, $stateParams, $filter, ProductsService) {

        // Declares the var vm (for ViewModel) and assigns it the object this. Any function or variable that you attach
        // to vm will be exposed to callers of this controller
        var vm = this;

        // Exposed data models -----------------------------------------------------------------------------------------
        vm.product = {};
        console.log("StateParams: ", $stateParams._id);
        
        // Exposed functions (Called from View) ------------------------------------------------------------------------
        vm.updateProduct = updateProduct;
        vm.goBack = goBack;

        // Initializations (Functions that are run when view/html is loaded) -------------------------------------------
        retrieveProduct($stateParams._id);

        // Function declaration and definition -------------------------------------------------------------------------

        // Retrieve Product
        function updateProduct() {
            console.log("* ProductsUpdateController: updateProduct");
            ProductsService
                .updateProduct($stateParams._id, vm.product)
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    // vm.product = data;
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                });
        }

        // Retrieve Product
        function retrieveProduct(id) {
            console.log("* ProductsDetailController: retrieveProduct");
            ProductsService
                .retrieveProduct(id)
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    vm.product = data;
                    // vm.product.address.coord[0] = $filter('number')(parseInt(vm.product.address.coord[0]), 2)
                    // vm.product.address.coord[1] = $filter('number')(parseInt(vm.product.address.coord[1]), 2)
                    // vm.product.address.coord[0] = parseFloat(vm.product.address.coord[0]).toFixed(2);
                    // vm.product.address.coord[1] = parseFloat(vm.product.address.coord[1]).toFixed(2);
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                });
        }

        // Go back to product list page
        function goBack() {
            console.log("* ProductsUpdateController: goBack");
            $state.go("products");
        }
    }
})();