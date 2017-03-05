(function() {
  'use strict';

  angular
    .module('app.classEvents')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'classEvents',
        config: {
          url: '/classEvents',
          templateUrl: 'app/classEvents/classEvents.html',
          controller: 'ClassEventsController',
          controllerAs: 'vm',
          title: 'Aulas',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Aulas'
          }
        }
      },
      {
        state: 'classEventEdit',
        config: {
          url: '/classEvent/:register/edit',
          templateUrl: 'app/classEvents/classEvents.new.html',
          controller: 'ClassEventsEditController',
          controllerAs: 'vm',
          title: 'Aulas'
        }
      },
      {
        state: 'classEventView',
        config: {
          url: '/classEvent/:register',
          templateUrl: 'app/classEvents/classEvents.view.html',
          controller: 'ClassEventsViewController',
          controllerAs: 'vm',
          title: 'Aulas'
        }
      },
      {
        state: 'classEventNew',
        config: {
          url: '/classEvent',
          templateUrl: 'app/classEvents/classEvents.new.html',
          controller: 'ClassEventsNewController',
          controllerAs: 'vm',
          title: 'Aulas'
        }
      }
    ];
  }
})();
