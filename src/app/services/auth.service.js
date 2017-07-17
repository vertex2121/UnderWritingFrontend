(function() {
    'use strict';
    angular
        .module('app')
        .factory('authService', auth);

    auth.$inject = ['$http', '$state', '$rootScope', '$q', '$httpParamSerializerJQLike'];

    function auth($http, $state, $rootScope, $q, $httpParamSerializerJQLike) {
        var user = {
            name: 'anonimous',
            roles: [],
            currentRole: undefined,
            authenticated: false
        };
        var service = {
            login: login,
            logout: logout,
            checkAuthenticate: checkAuthenticate,
            selectRole: selectRole,
            user: user,
            activate: checkAuthenticate
        };

        return service;

        function checkAuthenticate(callback) {
            $http.get('/api/user').then(function(response) {
                if (response.data.name) {
                    user.authenticated = true;
                    user.roles = response.data.principal.authorities;
                    user.currentRole = user.roles[0];
                } else {
                    initUser();
                    $state.go("login");
                }
                callback && callback();
                return user.authenticated;
            }, function() {
                initUser();
                callback && callback();
                return user.authenticated;
            });
        }

        function authenticate(credentials, callback) {
            var data = {};
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            if (credentials) {
                data.username = credentials.username;
                data.password = credentials.password;
                if (credentials.rememberMe) {
                    data["remember-me"] = 'on';
                }
                $http.post('/api/login', $httpParamSerializerJQLike(data), {
                    headers: headers
                }).then(function(response) {
                    callback && callback();
                }, function() {
                    user.authenticated = false;
                    callback && callback();
                });
            }
        };

        function login(credentials) {
            authenticate(credentials, function() {
                checkAuthenticate(function() {
                    credentials.password = '';
                    if (user.authenticated) {
                        $state.go("applications");
                    }
                })

            });
        };

        function logout() {
            $http
                .post('/api/logout', {})
                .finally(function() {
                    user.authenticated = false;
                    $state.go("login");
                });
        };

        function selectRole(role) {
            if (user.roles.indexOf(role) >= 0) {
                user.currentRole = role;
                $state.go("home");
                $rootScope.$broadcast('roleChangedEvent');
            }
        }

        function initUser() {
            user.name = 'anonimous';
            user.roles = [];
            user.currentRole = undefined;
            user.authenticated = false;
        }
    }
})();
