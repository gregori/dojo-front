(function() {
'use strict';

    angular
        .module('app.users')
        .controller('UsersEditController', UsersEditController);

    UsersEditController.$inject = ['UsersService', 'logger', 'exception', '$filter', 'dataservice', '$state', '$routeParams'];
    /* @ngInject */
    function UsersEditController(UsersService, logger, exception, $filter, dataservice, $state, $routeParams) {
        var vm = this;
        vm.title = 'Edição de Aluno';
        vm.onTimeSet = onTimeSet;
        vm.onDobBlur = onDobBlur;
        vm.getAddressFromCEP = getAddressFromCep;
        vm.processForm = processForm;
        vm.formData = {};
        vm.adult = true;
        vm.states = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA',
					'MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR',
					'RS','SC','SE','SP','TO'];

        activate();

        ////////////////

        function activate() { 
            logger.info("Activated NewUser View");
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

        function getAddressFromCep($event) {
            logger.info("Teste");
            return dataservice.getAddressFromCep(vm.formData.cep).then(function(data) {
                logger.info(data);
                vm.address = data;
                vm.formData.street = data.logradouro;
                vm.formData.neighborhood = data.bairro;
                vm.formData.city = data.localidade;
                vm.formData.state = data.uf;

                return vm.address;
            });
        }

        function processForm() {
            logger.info("Enviando Formulário!");
            return UsersService.postUser(vm.formData).then(function(data) {
                logger.info("Aluno criado com sucesso!");
                $state.go('users');
            });
        }

        function clearForm() {
            logger.info("Cancelando operação.");
            $state.go('users');
        }
    }
})();