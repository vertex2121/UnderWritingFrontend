(function() {
    'use strict';
    angular
        .module('app')
        .controller('applicationsController', applicationsController)

    applicationsController.$inject = ['applicationsService', '$scope', 'authService'];

    function applicationsController(applicationsService, $scope, authService) {
        var ac = this;
        ac.apps;
        ac.capture = capture;

        $scope.$on('roleChangedEvent', function(event) {
            refreshApplList();
        });

        if (authService.user.authenticated) {
            refreshApplList();
        }

        function capture(appNum) {
            applicationsService.capture(appNum);
        }

        function refreshApplList() {
            ac.apps = [];
            applicationsService.getApplications()
                .then(function(applications) {
                    ac.apps = applications;
                });
        }
    }
})();
