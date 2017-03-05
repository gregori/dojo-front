(function() {
'use strict';

    angular
        .module('app.service')
        .factory('BeltsService', BeltsService);

    BeltsService.inject = ['$http', '$q', 'exception', 'logger', 'uri', 'SpringDataRestAdapter'];
    /* @ngInject */
    function BeltsService($http, $q, exception, logger, uri, SpringDataRestAdapter) {
        var service = {
            getBelts:getBelts,
            postBelt: postBelt,
            deleteBelt: deleteBelt
        };
        
        var httpGetPromise = $http.get(uri + '/belts');

        return service;

        ////////////////
        function getBelts() {
            return SpringDataRestAdapter.process(httpGetPromise, 'nextBelt', true)
            //return $http.get(uri + '/belts')
                .then(success)
                .catch(fail);

            function success(response) {
                return response;
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao obter faixas (getBelts)");
            }
        }

        function postBelt(data) {
            return $http.post(uri + '/belts', data, {})
                .then(success)
                .catch(fail);

            function success(response) {
                console.log(response);
                logger.success("Faixa " + response.name + " adicionada com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao cadastrar faixa (postBelt)");
            }
        }

        function deleteBelt(url) {
            return $http.delete(url)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success("Aluno removido com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao remover aluno (deleteBelt)");
            }
        } 
    }
})();