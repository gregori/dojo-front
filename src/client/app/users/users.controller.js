(function() {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['logger', 'UsersService'];
  /* @ngInject */
  function UsersController(logger, UsersService) {
    var vm = this;
    vm.title = 'Alunos';

    activate();

    function activate() {
      logger.info('Activated Users View');
    }
  }
})();
