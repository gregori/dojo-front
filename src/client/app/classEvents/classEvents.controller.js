(function() {
  'use strict';

  angular
    .module('app.classEvents')
    .controller('ClassEventsController', ClassEventsController);

  ClassEventsController.$inject = ['logger', 'ClassEventsService', 'UsersService', 'DojosService'];
  /* @ngInject */
  function ClassEventsController(logger, ClassEventsService, UsersService, DojosService) {
    var vm = this;
    vm.title = 'Aulas';
    vm.classEvents = [];
    vm.deleteClassEvent = deleteClassEvent;
    vm.getInstructor = getInstructor;
    vm.getInstructors = getInstructors;
    vm.instructors = [];

    activate();

    function activate() {
      logger.info('Activated ClassEvents View');
      getClassEvents();
    }

    function getClassEvents() {
      return ClassEventsService.getClassEvents().then(function(data) {
        vm.classEvents = data._embedded.classEvents;
        return vm.classEvents;
      });
    }

    function deleteClassEvent(classEvent) {
      return ClassEventsService.deleteClassEvent(classEvent._links.self.href).then(function(data) {
        logger.success("Aula removida com sucesso.");
        activate(); 
      });
    }

    function getInstructor(instUrl) {
      return UsersService.getUserByUrl(instUrl).then(function(data) {
        vm.instructor = data._embedded.user;
        return vm.instructor;
      });
    }

    function getInstructors() {
      return UsersService.getUsers().then(function(data) {
        vm.instructors = data._embedded.users;
        return vm.instructors;
      });
    }

  }
})();
