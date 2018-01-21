(function () {
    'use strict';

    angular
        .module('webShopAdmin')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'Flash', 'GlobalService', 'BaseService'];
    function LoginController($location, AuthenticationService, Flash, GlobalService, BaseService) {
        var vm = this;

        vm.login = login;
        vm.resetPassword = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials(function (response) {

            });
        })();


        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.userName == vm.username) {
                    AuthenticationService.SetCredentials(vm.username, vm.password, response.access_token);
                    $location.path('/');
                } else {
                    Flash.create('danger', 'Korisničko ime ili šifra nisu validni');
                    vm.dataLoading = false;
                }
            });
        };

        



    }

})();
