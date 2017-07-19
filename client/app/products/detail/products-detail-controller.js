(function() {
    'use strict';

    angular
        .module('Shopping')
        .controller('ProductsDetailController', ProductsDetailController);

    ProductsDetailController.$inject = ['$stateParams', '$uibModal', 'ProductsService'];
    function ProductsDetailController($stateParams, $uibModal, ProductsService) {

        // Declares the var vm (for ViewModel) and assigns it the object this. Any function or variable that you attach
        // to vm will be exposed to callers of this controller
        var vm = this;

        // Exposed data models -----------------------------------------------------------------------------------------
        vm.product = {};
        // console.log("StateParams: ", $stateParams._id);
        
        // Exposed functions (Called from View) ------------------------------------------------------------------------
        vm.modalGradeForm = modalGradeForm;

        // Initializations (Functions that are run when view/html is loaded) -------------------------------------------
        retrieveProduct($stateParams._id);

        // Function declaration and definition -------------------------------------------------------------------------

        // Retrieve Product
        function retrieveProduct(id) {
            console.log("* ProductsDetailController: retrieveProduct");
            ProductsService
                .retrieveProduct(id)
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    vm.product = data;
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                });
        }

        // Add new Grade
        function modalGradeForm() {
            // alert("Add Grade Form");
            var modalInstance = $uibModal.open({
                templateUrl: 'app/products/detail/add-grade-modal.html',
                controller: 'GradeModalController as vm',
                resolve: {
                    productData: function() {
                        return {
                            id: $stateParams._id,
                            name: vm.product.name
                        }
                    }
                }
            });
            modalInstance.result
            .then(function(data) {
                vm.product.grades.push(data);
            })
            // Handle errors when closing the modal without submitting
            .catch(function(res){});
        }
    }
})();