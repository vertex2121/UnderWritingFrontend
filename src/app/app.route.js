(function() {
    'use strict';
    angular
        .module('app')
        .config(configure);

    configure.$inject = ['$stateProvider'];

    function configure($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/applications/applications.html',
                controller: 'applicationsController',
                controllerAs: 'applCtrl'
            }).state('login', {
                url: '/login',
                templateUrl: '/login.html',
                controller: 'loginController',
                controllerAs: 'loginCtrl'
            }).state('help', {
                url: '/help',
                templateUrl: '/help.html'
            }).state('denied', {
                url: '/denied',
                templateUrl: '/denied.html'
            }).state('applications', {
                url: '/applications',
                templateUrl: 'applications/applications.html',
                controller: 'applicationsController',
                controllerAs: 'applCtrl'
            }).state('details', {
                url: '/applications/:applicationNum/details',
                views: {
                    "": {
                        templateUrl: '/tabs/details.html',
                        controller: 'detailsController',
                        controllerAs: 'dtlsCtrl'
                    },
                    "primary@details": {
                        templateUrl: "/tabs/primary.html",
                        controller: 'primaryTabController',
                        controllerAs: 'primTabsCtrl'
                    },
                    "client_info@details": {
                        templateUrl: "/tabs/client_info.html"
                    },
                    "client_phones@details": {
                        templateUrl: "/tabs/client_phones.html"
                    },
                    "client_income@details": {
                        templateUrl: "/tabs/client_income.html"
                    },
                    "client_credits@details": {
                        templateUrl: "/tabs/client_credits.html"
                    },
                    "client_params@details": {
                        templateUrl: "/tabs/client_params.html"
                    },
                    "client_fraud@details": {
                        templateUrl: "/tabs/client_fraud.html"
                    }
                }
            });
    }
})();
