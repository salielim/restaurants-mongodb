(function() {
    'use strict';

    angular
        .module('Shopping')
        .service('CommonService', CommonService);

    CommonService.$inject = [];
    function CommonService () {
        // Declares the var service and assigns it the object this (in this case, the ShopService). Any function or
        // variable that you attach to service will be exposed to callers of ShopService
        var service = this;

        // EXPOSED DATA MODELS -----------------------------------------------------------------------------------------

        // EXPOSED FUNCTIONS -------------------------------------------------------------------------------------------
        // service.sortCuisine = sortCuisine;

        // FUNCTION DECLARATION AND DEFINITION -------------------------------------------------------------------------

        // sortName: sort the name
        // Parameters: None. Returns: None
        // function sortCuisine(a, b) {
        //     var nameA = a.cuisine.toUpperCase(); // ignore upper and lowercase
        //     var nameB = b.cuisine.toUpperCase(); // ignore upper and lowercase
        //     if (nameA < nameB) {
        //         return -1;
        //     }
        //     if (nameA > nameB) {
        //         return 1;
        //     }
        //     // names must be equal
        //     return 0;
        // }
    }
})();