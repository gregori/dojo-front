(function() {
  'use strict';

  angular
    .module('app.users')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'users',
        config: {
          url: '/users',
          templateUrl: 'app/users/users.html',
          controller: 'UsersController',
          controllerAs: 'vm',
          title: 'Alunos',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Alunos'
          }
        }
      },
      {
        state: 'userEdit',
        config: {
          url: '/user/:id/edit',
          templateUrl: 'app/users/users.edit.html',
          controller: 'UsersEditController',
          controllerAs: 'vm',
          title: 'Alunos'
        }
      },
      {
        state: 'userView',
        config: {
          url: '/user/:id',
          templateUrl: 'app/users/users.view.html',
          controller: 'UsersViewController',
          controllerAs: 'vm',
          title: 'Alunos'
        }
      },
      {
        state: 'userDelete',
        config: {
          url: '/user/:id/delete',
          templateUrl: 'app/users/users.delete.html',
          controller: 'UsersDeleteController',
          controllerAs: 'vm',
          title: 'Alunos'
        }
      },
      {
        state: 'userNew',
        config: {
          url: '/user',
          templateUrl: 'app/users/users.new.html',
          controller: 'UsersNewController',
          controllerAs: 'vm',
          title: 'Alunos'
        }
      }
    ];
  }
})();
