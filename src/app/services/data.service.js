(function() {
    'use strict';
    angular
        .module('app')
        .factory('dataService', dataService);

    dataService.$inject = ['$http'];

    function dataService($http) {

        var service = {
            getDecisionCodes: getDecisionCodes
        }

        return service;

        function getDecisionCodes() {
            return $http.get('/api/decisionCodes/')
                .then(function successCallback(response) {
                    return response.data._embedded.decisionCodes;
                });
        };
    }

})();
