(function() {
  'use strict';

  angular
    .module('app.beltExams')
    .controller('BeltExamsController', BeltExamsController);

  BeltExamsController.$inject = ['logger', 'BeltExamsService'];
  /* @ngInject */
  function BeltExamsController(logger, BeltExamsService) {
    var vm = this;
    vm.title = 'Exame de Faixa';
    vm.beltExams = [];
    vm.deleteBeltExam = deleteBeltExam;

    activate();

    function activate() {
      logger.info('Activated BeltExams View');
      getBeltExams();
    }

    function getBeltExams() {
      return BeltExamsService.getBeltExams().then(function(data) {
        console.log(data);
        vm.beltExams = data._embeddedItems;
        return vm.beltExams;
      });
    }

    function deleteBeltExam(beltExam) {
      console.log(beltExam._links.self.href);
      return BeltExamsService.deleteBeltExam(beltExam._links.self.href).then(function(data) {
        logger.success("Exame de faixa removido com sucesso.");
        activate(); 
      });
    }
  }
})();
