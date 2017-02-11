(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'UsersService', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, UsersService, logger) {
    var vm = this;
    vm.news = {
      title: 'Administração de Dojo',
      description: 'Sistema para Administração de Dojo.'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.users = [];
    vm.title = 'Dashboard';
    vm.date = new Date();

    activate();

    function activate() {
      var promises = [getMessageCount(), getPeople(), getUsers()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getPeople() {
      return dataservice.getPeople().then(function(data) {
        vm.people = data;
        return vm.people;
      });
    }

    function getUsers() {
      return UsersService.getUsers().then(function(data) {
        vm.users = data._embedded.users;
        return vm.users;
      });
    }
  }
})();
