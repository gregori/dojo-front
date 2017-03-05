(function() {
  'use strict';

  angular
    .module('app.belts')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'belts',
        config: {
          url: '/belts',
          templateUrl: 'app/belts/belts.html',
          controller: 'BeltsController',
          controllerAs: 'vm',
          title: 'Faixas',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Faixas'
          }
        }
      },
      {
        state: 'beltEdit',
        config: {
          url: '/belt/:register/edit',
          templateUrl: 'app/belts/belts.new.html',
          controller: 'BeltsEditController',
          controllerAs: 'vm',
          title: 'Faixas'
        }
      },
      {
        state: 'beltView',
        config: {
          url: '/belt/:register',
          templateUrl: 'app/belts/belts.view.html',
          controller: 'BeltsViewController',
          controllerAs: 'vm',
          title: 'Faixas'
        }
      },
      {
        state: 'beltNew',
        config: {
          url: '/belt',
          templateUrl: 'app/belts/belts.new.html',
          controller: 'BeltsNewController',
          controllerAs: 'vm',
          title: 'Faixas'
        }
      }
    ];
  }
})();
