(function() {
'use strict';

    angular
        .module('app.users')
        .controller('ClassEventsNewController', UsersNewController);

    UsersNewController.$inject = ['UsersService', 'DojosService', 'logger', 'exception', '$filter', 
	    'dataservice', '$state', 'uri', 'ClassEventsService'];
    /* @ngInject */
    function UsersNewController(UsersService, DojosService, logger, exception, $filter, 
	    dataservice, $state, uri, ClassEventsService) {
        var vm = this;
        vm.title = 'Abrir Chamada ';
        vm.onTimeSet = onTimeSet;
        vm.onDobBlur = onDobBlur;
        vm.processForm = processForm;
        vm.formData = {};
	vm.dojos = [];
	vm.users = [];

        activate();

        ////////////////

        function activate() { 
            logger.info("Activated ClassEvent View");
            getDojos();
	    getUsers();
        }

        function onTimeSet(newDate, oldDate) {
            newDate = $filter('date')(newDate, "dd/MM/yyyy");
            vm.formData.dob = newDate;
            onDobBlur(undefined);
            logger.info(oldDate + " became " + newDate);
        }

        function onDobBlur($event) {
            var age = moment().diff(moment(vm.formData.dob, "DD/MM/YYYY"), 'years');
            vm.adult = age > 17;
            vm.isChild = age < 13;
        }

       function processForm() {
            logger.info("Enviando Formulário!");
            return ClassEventsService.postUser(vm.formData).then(function(data) {
                logger.info("Aula criada com sucesso!");
                $state.go('classEvents');
            });
        }

        function clearForm() {
            logger.info("Cancelando operação.");
            $state.go('classEvents');
        }

        function getDojos() {
            return DojosService.getDojos().then(function(data) {
                vm.dojos = data._embedded.dojoes;
                return vm.dojos;
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
