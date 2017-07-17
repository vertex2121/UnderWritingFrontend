(function() {
    'use strict';
    angular
        .module('app')
        .factory('applicationsService', applicationsService);

    applicationsService.$inject = ['$http', 'authService', 'alertService', 'decisionService', '$q', '$state'];

    function applicationsService($http, auth, alertService, decisionService, $q, $state) {
        var service = {
            getApplications: getApplications,
            capture: capture
        }

        return service;

        function getApplications() {
            var deferred = $q.defer();
            var searchUrl;
            if (auth.user.currentRole) {
                if (auth.user.currentRole.authority === 'UNDERWRITER') {
                    searchUrl = '/api/applications/search/findUnderwriterApps?projection=appl_detail'
                } else if (auth.user.currentRole.authority === 'CONTROLLER') {
                    searchUrl = '/api/applications/search/findUnderwriterApps?projection=appl_detail'
                } else if (auth.user.currentRole.authority === 'SUPERVISOR') {
                    searchUrl = '/api/applications/search/findUnderwriterApps?projection=appl_detail'
                } else if (auth.user.currentRole.authority === 'MANAGER') {
                    searchUrl = '/api/applications/search/findManagerApps?projection=appl_detail'
                }
                if (searchUrl) {
                    $http.get(searchUrl).then(function(res) {
                        deferred.resolve(res.data._embedded.applications);
                    }, function(err) {
                        alertService.add('danger', err.status + ' ' + err.statusText);
                        deferred.reject(err);
                    });
                } else {
                    alertService.add('danger', 'Для роли ' + auth.user.currentRole.authority + ' не настроен интерфейс.');
                    deferred.reject();
                }
            } else {
                alertService.add('danger', 'Не выбрана роль.');
                deferred.reject();
            }
            return deferred.promise;
        }

        function capture(applNum) {
            var currentRole = auth.user.currentRole.authority;
            var captureUrl = "/api/applications/" + applNum + "/capture?role=" + currentRole
            return $http.post(captureUrl)
                .then(function successCallback(res) {
                    decisionService.init();
                    $state.go("details", {
                        'applicationNum': applNum
                    });
                    return res;
                }, function errorCallback(err) {
                    alertService.add('danger', err.data);
                    return $q.reject(err);
                });
        }
    }
})();
