(function() {
'use strict';

    angular
        .module('app.service')
        .factory('UsersService', UsersService);

    UsersService.inject = ['$http', '$q', 'exception', 'logger', 'uri'];
    /* @ngInject */
    function UsersService($http, $q, exception, logger, uri) {
        var service = {
            getUsers:getUsers,
            postUser: postUser,
            deleteUser: deleteUser
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
                return exception.catcher("XHR falhou ao obter usuários (getUsers)");
            }
        }

        function postUser(data) {
            return $http.post(uri + '/users', data, {})
                .then(success)
                .catch(fail);

            function success(response) {
                console.log(response);
                logger.success("Aluno " + response.name + " adicionado com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao cadastrar usuário (postUser)");
            }
        }

        function deleteUser(url) {
            return $http.delete(url)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success("Aluno removido com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao remover aluno (deleteUser)");
            }
        } 
    }
})();