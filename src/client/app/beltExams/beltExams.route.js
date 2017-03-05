(function() {
  'use strict';

  angular
    .module('app.beltExams')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'beltExams',
        config: {
          url: '/beltExams',
          templateUrl: 'app/beltExams/beltExams.html',
          controller: 'BeltExamsController',
          controllerAs: 'vm',
          title: 'Exames de Faixa',
          settings: {
            nav: 2,
            content: '<i class="fa fa-lock"></i> Exames de Faixa'
          }
        }
      },
      {
        state: 'beltExamEdit',
        config: {
          url: '/beltExam/:register/edit',
          templateUrl: 'app/beltExams/beltExams.new.html',
          controller: 'BeltExamsEditController',
          controllerAs: 'vm',
          title: 'Exames de Faixa'
        }
      },
      {
        state: 'beltExamView',
        config: {
          url: '/beltExam/:register',
          templateUrl: 'app/beltExams/beltExams.view.html',
          controller: 'BeltExamsViewController',
          controllerAs: 'vm',
          title: 'Exames de Faixa'
        }
      },
      {
        state: 'beltExamNew',
        config: {
          url: '/beltExam',
          templateUrl: 'app/beltExams/beltExams.new.html',
          controller: 'BeltExamsNewController',
          controllerAs: 'vm',
          title: 'Exames de Faixa'
        }
      }
    ];
  }
})();
