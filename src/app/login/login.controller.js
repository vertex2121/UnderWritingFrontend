(function () {
    'use strict';
    angular
            .module('app')
            .controller('loginController', loginController);

    loginController.$inject = ['authService'];

    function loginController(authService) {
        var lc = this;
        var credentials = {
          username: '',
          password: '',
          rememberMe: true
        };

        lc.credentials = credentials;
        lc.login = login;

        function login() {
          authService.login(credentials);
        }
    }
})();
