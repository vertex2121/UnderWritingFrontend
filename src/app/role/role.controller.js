(function() {
    'use strict';
    angular
        .module('app')
        .controller('roleController', roleController);

    roleController.$inject = ['authService', '$state', '$scope', '$rootScope', 'alertService'];

    function roleController(authService, $state, $scope, $rootScope, alertService) {
        var rc = this;

        rc.getRoles = getRoles;
        rc.changeRole = changeRole;
        rc.logout = logout;
        rc.authenticated = isAuthenticated;
        rc.showLinks = showLinks;
        rc.selectedRole;
        rc.closeAlert = closeAlert;

        function isAuthenticated() {
            return authService.user.authenticated;
        }

        function logout() {
            authService.logout();
        }

        function changeRole() {
            authService.selectRole(rc.selectedRole);
        }

        function getRoles() {
            var roles = authService.user.roles;
            rc.selectedRole = authService.user.currentRole;
            return roles;
        }

        function showLinks() {
            if (!isAuthenticated && $state.current !== 'login') {
                return true;
            }
        }

        function closeAlert(index) {
            alertService.closeAlert();
        }
    }
})();
