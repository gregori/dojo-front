(function() {
'use strict';

    angular
        .module('app.service')
        .factory('UsersService', UsersService);

    UsersService.inject = ['$http', '$q', 'exception', 'logger', 'uri'];
    /* @ngInject */
    function UsersService($http, $q, exception, logger, uri) {
        var service = {
            getUsers:getUsers
        };
        
        return service;

        ////////////////
        function getUsers() {
            return $http.get(uri + '/users')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR falhou ao obter usuários (getUsers)');
            }
        }
    }
})();