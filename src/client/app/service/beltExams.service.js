(function() {
'use strict';

    angular
        .module('app.service')
        .factory('BeltExamsService', BeltExamsService);

    BeltExamsService.inject = ['$http', '$q', 'exception', 'logger', 'uri', 'SpringDataRestAdapter'];
    /* @ngInject */
    function BeltExamsService($http, $q, exception, logger, uri, SpringDataRestAdapter) {
        var service = {
            getBeltExams:getBeltExams,
            postBeltExam: postBeltExam,
            deleteBeltExam: deleteBeltExam
        };

        var httpGetPromise = $http.get(uri + '/userBelts');
        
        return service;

        ////////////////
        function getBeltExams() {
            return SpringDataRestAdapter.process(httpGetPromise, ['user', 'belt'], true)
            //return $http.get(uri + '/userBelts')
                .then(success)
                .catch(fail);

            function success(response) {
                //console.log(response);
                return response;
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao obter exames de faixa (getBeltExams)");
            }
        }

        function postBeltExam(data) {
            return $http.post(uri + '/userBelts', data, {})
                .then(success)
                .catch(fail);

            function success(response) {
                console.log(response);
                logger.success("Exame de faixa " + response.name + " adicionado com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao cadastrar exame de faixa (postBeltExam)");
            }
        }

        function deleteBeltExam(url) {
            return $http.delete(url)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success("Exame de faixa removido com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao remover exame de faixa (deleteBeltExam)");
            }
        } 
    }
})();