(function() {
    'use strict';
    angular
        .module('app', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
        .run(runner);

    runner.$inject = ['$rootScope', 'authService', '$state'];

    function runner($rootScope, authService, $state) {

        authService.checkAuthenticate(afterCheckAuthenticate);

        function afterCheckAuthenticate() {
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
                if (!authService.user.authenticated) {
                    if (toState.name !== 'login') {
                        event.preventDefault();
                        $state.go('login');
                    }
                }
            });
        }
    }
})();
