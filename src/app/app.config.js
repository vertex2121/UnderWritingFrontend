(function () {
    'use strict';
    angular
            .module('app')
            .config(configure);

    configure.$inject = ['$httpProvider', '$locationProvider'];

    function configure($httpProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }
})();
