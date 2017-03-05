(function() {
'use strict';

    angular
        .module('app.service')
        .factory('ClassEventsService', ClassEventsService);

    ClassEventsService.inject = ['$http', '$q', 'exception', 'logger', 'uri'];
    /* @ngInject */
    function ClassEventsService($http, $q, exception, logger, uri) {
        var service = {
            getClassEvents:getClassEvents,
            postClassEvent: postClassEvent,
            deleteClassEvent: deleteClassEvent
        };
        
        return service;

        ////////////////
        function getClassEvents() {
            return $http.get(uri + '/classEvents')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao obter classEvents (getClassEvents)");
            }
        }

        function postClassEvent(data) {
            return $http.post(uri + '/classEvents', data, {})
                .then(success)
                .catch(fail);

            function success(response) {
                console.log(response);
                logger.success("ClassEvent " + response.name + " adicionado com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao cadastrar classEvent (postClassEvent)");
            }
        }

        function deleteClassEvent(url) {
            return $http.delete(url)
                .then(success)
                .catch(fail);

            function success(response) {
                logger.success("Aula removido com sucesso!");
            }

            function fail(e) {
                return exception.catcher("XHR falhou ao remover aula (deleteClassEvent)");
            }
        } 
    }
})();
