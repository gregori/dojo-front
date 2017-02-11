(function() {
'use strict';

    angular
        .module('app.users')
        .controller('UsersEditController', UsersEditController);

    UsersEditController.$inject = ['UsersService', 'logger', 'exception'];
    function UsersEditController(UsersService) {
        var vm = this;
        vm.title = 'Alunos';

        activate();

        ////////////////

        function activate() { }
    }
})();