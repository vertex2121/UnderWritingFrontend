(function() {
    'use strict';
    angular
        .module('app')
        .factory('decisionService', decisionService);

    decisionService.$inject = ['$http', 'authService', 'alertService', '$state', '$stateParams', '$q'];

    function decisionService($http, authService, alertService, $state, $stateParams, $q) {
        var service = {
            decision: {},
            save: save,
            postpone: postpone,
            improve: improve,
            recall: recall,
            finalize: finalize,
            deb: deb,
            init: init
        };

        return service;

        function init() {
            service.decision = {};
            service.decision.applNum = $stateParams.applicationNum;
            service.decision.role = authService.user.currentRole.authority;
        }

        function save() {
            var urlString = "/api/applications/" + service.decision.applNum + "/save?role=" + service.decision.role;
            return postDecision(urlString);
        };

        function postpone(applNum) {
            var urlString = "/api/applications/" + service.decision.applNum + "/postpone?role=" + service.decision.role;
            return postDecision(urlString);
        };

        function improve(applNum) {
            var urlString = "/api/applications/" + service.decision.applNum + "/improve?role=" + service.decision.role;
            return postDecision(urlString);
        };

        function recall(applNum) {
            var urlString = "/api/applications/" + service.decision.applNum + "/recall?role=" + service.decision.role;
            return postDecision(urlString);
        };

        function finalize(applNum) {
            var urlString = "/api/applications/" + service.decision.applNum + "/finalize?role=" + service.decision.role;
            return postDecision(urlString);
        };

        function deb(applNum) {
            var urlString = "/api/applications/" + service.decision.applNum + "/deb?role=" + service.decision.role;
            return postDecision(urlString);
        };

        function postDecision(urlString) {
            return $http.post(urlString, service.decision)
                .then(function successCallback(response) {
                    $state.go('applications');
                    return response.data;
                }, function errorCallback(err) {
                    alertService.add('danger', err.status + ' ' + err.statusText);
                    return $q.reject(err);
                });
        }
    }
})();
