(function() {
'use strict';

    angular
        .module('app.beltExams')
        .controller('BeltExamsNewController', BeltExamsNewController);

    BeltExamsNewController.$inject = ['BeltExamsService', 'logger', 'exception', '$filter', 'dataservice', '$state', 'uri'];
    /* @ngInject */
    function BeltExamsNewController(BeltExamsService, logger, exception, $filter, dataservice, $state, uri) {
        var vm = this;
        vm.title = 'Novo Exame de Faixa';

        vm.processForm = processForm;
        vm.formData = {};

        activate();

        ////////////////

        function activate() { 
            logger.info("Activated NewBeltExam View");
            getBeltExams();
        }

        function processForm() {
            logger.info("Enviando Formulário!");
            // vm.formData.dojo = uri + '/dojoes' + vm.formData.dojo;
            return BeltExamsService.postBeltExam(vm.formData).then(function(data) {
                logger.info("Exame de Faixa criado com sucesso!");
                $state.go('beltExams');
            });
        }

        function clearForm() {
            logger.info("Cancelando operação.");
            $state.go('beltExams');
        }

        function getBeltExams() {
            return BeltExamsService.getBeltExams().then(function(data) {
                vm.beltExams = data._embedded.beltExams;
                return vm.beltExams;
            });
        }
    }
})();