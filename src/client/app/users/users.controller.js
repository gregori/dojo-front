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
    vm.users = [];
    vm.deleteUser = deleteUser;

    activate();

    function activate() {
      logger.info('Activated Users View');
      getUsers();
    }

    function getUsers() {
      return UsersService.getUsers().then(function(data) {
        vm.users = data._embedded.users;
        return vm.users;
      });
    }

    function deleteUser(user) {
      console.log(user._links.self.href);
      return UsersService.deleteUser(user._links.self.href).then(function(data) {
        logger.success("Aluno removido com sucesso.");
        activate(); 
      });
    }
  }
})();
