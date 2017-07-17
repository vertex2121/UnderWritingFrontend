(function () {
    'use strict';
    angular
            .module('app')
            .factory('alertService', alertService);

    alertService.$inject = ['$rootScope', '$timeout'];

    function alertService($rootScope, $timeout) {
        $rootScope.alerts = [];
        var service = {
            add: add,
            closeAlert: closeAlert
        };

        return service;

        function add(type, msg) {
            $rootScope.alerts.push({
                type: type,
                msg: msg,
                close: function () {
                    return service.closeAlert(this);
                }
            });
            $timeout(function () {
                service.closeAlert(this);
            }, 5000);
        }

        function closeAlert(index) {
            $rootScope.alerts.splice(index, 1);
        }


    }
})();
