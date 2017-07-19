(function() {
    'use strict';

    angular
        .module('Shopping')
        .controller('GradeModalController', GradeModalController);

    GradeModalController.$inject = ['$uibModalInstance', 'productData', 'ProductsService'];
    function GradeModalController($uibModalInstance, productData, ProductsService) {
        // Declares the var vm (for ViewModel) and assigns it the object this. Any function or variable that you attach
        // to vm will be exposed to callers of this controller
        var vm = this;

        // Exposed data models -----------------------------------------------------------------------------------------
        vm.formData = {};
        vm.formData.date =  new Date();
        vm.productData = productData;
        
        // Exposed functions (Called from View) ------------------------------------------------------------------------
        // vm.cancelModal = cancelModal;
        vm.modal = {
            close: function(result) {
                $uibModalInstance.close(result);
            },
            cancel: function() {
                $uibModalInstance.dismiss('cancel');
            }
        }
        vm.addGrade = addGrade;

        // Initializations (Functions that are run when view/html is loaded) -------------------------------------------

        // Function declaration and definition -------------------------------------------------------------------------
        // function cancelModal() {
        //     $uibModalInstance.dismiss('cancel');
        // }

        function addGrade() {
            console.log("* GradeModalController: addGrade");
            console.log("Grade Data: ", vm.formData);
            console.log("Grade ID: ", vm.productData.id);
            ProductsService
                .addGrade(vm.productData.id, vm.formData)
                .then(function (data) {
                    console.log("> Controller Result:", data);
                    vm.modal.close(data);
                })
                .catch(function (err) {
                    console.log("> Controller Error:", err);
                });           
        }
    }
})();