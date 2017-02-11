(function() {
'use strict';

    angular
        .module('app.users')
        .controller('UsersNewController', UsersNewController);

    UsersNewController.$inject = ['UsersService', 'logger', 'exception', '$filter', 'dataservice'];
    function UsersNewController(UsersService, logger, exception, $filter, dataservice) {
        var vm = this;
        vm.title = 'Novo Aluno';
        vm.onTimeSet = onTimeSet;
        vm.onDobBlur = onDobBlur;
        vm.getAddressFromCEP = getAddressFromCep;
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
            vm.dob = newDate;
            onDobBlur(undefined);
            logger.info(oldDate + " became " + newDate);
        }

        function onDobBlur($event) {
            var age = moment().diff(moment(vm.dob, "DD/MM/YYYY"), 'years');
            vm.adult = age > 17;
            vm.isChild = age < 13;
        }

        function getAddressFromCep($event) {
            logger.info("Teste");
            return dataservice.getAddressFromCep(vm.cep).then(function(data) {
                logger.info(data);
                vm.address = data;
                vm.street = data.logradouro;
                vm.neighborhood = data.bairro;
                vm.city = data.localidade;
                vm.state = data.uf;

                return vm.address;
            });
        }
    }
})();