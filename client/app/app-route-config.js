(function() {
    // 'use strict';

    angular
        .module('Shopping')
        .config(ShoppingConfig);

    ShoppingConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];

    function ShoppingConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'app/main/home.html',
                controller: 'HomeController',
                controllerAs: "ctrl"
            })
            .state('products', {
                url: '/products',
                templateUrl: 'app/products/search/products.html',
                controller: 'ProductsController',
                controllerAs: "ctrl"
            })
            .state('register', {
                url: '/register',
                templateUrl: 'app/products/add/products-add.html',
                controller: 'ProductsAddController',
                controllerAs: "ctrl"
            })
            .state('detail', {
                url: '/detail/:_id',
                templateUrl: 'app/products/detail/products-detail.html',
                controller: 'ProductsDetailController',
                controllerAs: "ctrl"
            })
            .state('update', {
                url: '/update/:_id',
                templateUrl: 'app/products/update/products-update.html',
                controller: 'ProductsUpdateController',
                controllerAs: "ctrl"
            })
            // .state('Admin', {
            //     url: '/admin',
            //     templateUrl: 'app/admin/admin.html',
            //     controller: 'AdminController',
            //     controllerAs: "ctrl"
            // })
        
        $urlRouterProvider.otherwise('/home');

        // $locationProvider.html5Mode(true);
    }
})();