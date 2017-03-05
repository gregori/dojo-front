(function() {
'use strict';

    angular
        .module('app.service')
        .factory('DojosService', DojosService);

    DojosService.inject = ['$http', '$q', 'exception', 'logger', 'uri'];
    /* @ngInject */
    function DojosService($http, $q, exception, logger, uri) {
        var service = {
            getDojos:getDojos,
            postDojo: postDojo,
            deleteDojo: deleteDojo
        };
        
        return service;

        ////////////////
        function getDojos() {
            return $http.get(uri + '/dojoes')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao obter dojos (getDojos)");
            }
        }

        function postDojo(data) {
            return $http.post(uri + '/dojoes', data, {})
                .then(success)
                .catch(fail);

            function success(response) {
                console.log(response);
                logger.success("Dojo " + response.name + " adicionado com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao cadastrar dojo (postDojo)");
            }
        }

        function deleteDojo(url) {
            return $http.delete(url)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success("Aluno removido com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao remover aluno (deleteDojo)");
            }
        } 
    }
})();