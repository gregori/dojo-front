(function() {
  'use strict';

  angular
    .module('app.belts')
    .controller('BeltsController', BeltsController);

  BeltsController.$inject = ['logger', 'BeltsService'];
  /* @ngInject */
  function BeltsController(logger, BeltsService) {
    var vm = this;
    vm.title = 'Faixas';
    vm.belts = [];
    vm.deleteBelt = deleteBelt;

    activate();

    function activate() {
      logger.info('Activated Belts View');
      getBelts();
    }

    function getBelts() {
      return BeltsService.getBelts().then(function(data) {
        vm.belts = data._embeddedItems;
        console.log(vm.belts);
        return vm.belts;
      });
    }

    function deleteBelt(belt) {
      console.log(belt._links.self.href);
      return BeltsService.deleteBelt(belt._links.self.href).then(function(data) {
        logger.success("Faixa removida com sucesso.");
        activate(); 
      });
    }
  }
})();
