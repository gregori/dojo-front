(function() {
'use strict';

    angular
        .module('app.belts')
        .controller('BeltsNewController', BeltsNewController);

    BeltsNewController.$inject = ['BeltsService', 'logger', 'exception', '$filter', 'dataservice', '$state', 'uri'];
    /* @ngInject */
    function BeltsNewController(BeltsService, logger, exception, $filter, dataservice, $state, uri) {
        var vm = this;
        vm.title = 'Nova Faixa';

        vm.processForm = processForm;
        vm.formData = {};
        vm.formData.child = false;

        activate();

        ////////////////

        function activate() { 
            logger.info("Activated NewBelt View");
            getBelts();
        }

        function processForm() {
            logger.info("Enviando Formulário!");
            
            return BeltsService.postBelt(vm.formData).then(function(data) {
                logger.info("Faixa criada com sucesso!");
                $state.go('belts');
            });
        }

        function clearForm() {
            logger.info("Cancelando operação.");
            $state.go('belts');
        }

        function getBelts() {
            return BeltsService.getBelts().then(function(data) {
                vm.belts = data._embeddedItems;
                return vm.belts;
            });
        }
    }
})();