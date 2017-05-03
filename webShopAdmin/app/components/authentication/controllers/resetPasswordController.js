(function () {
    'use strict';

    angular
        .module('webShopAdmin')
        .controller('ResetPasswordController', ResetPasswordController);

    ResetPasswordController.$inject = ['$window','$location', 'UserService', 'Flash', 'GlobalService', 'BaseService', '$translate'];
    function ResetPasswordController($window, $location, UserService, Flash, GlobalService, BaseService, $translate) {
        var vm = this;
        vm.Email = '';
        vm.Password = '';
        vm.ConfirmPassword = '';
        vm.Code = '';
        vm.ResetPassword = ResetPassword;

        var parseLocation = function (location) {
            var pairs = location.substring(1).split("&");
            var obj = {};
            var pair;
            var i;

            for (i in pairs) {
                if (pairs[i] === "") continue;

                pair = pairs[i].split("=");
                obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }

            return obj;
        };

        vm.Code = parseLocation(window.location.href)['code'];

        function ResetPassword() {
            if (vm.Password !== vm.ConfirmPassword) {
                $translate('ERRORS.PASSWORD-CHECK').then(function (translate) {
                    Flash.create('danger', translate);
                });
                return false;
            }
            GlobalService.SetLoaderStatus(true);
            UserService.ResetPassword(vm, function(response) {
                GlobalService.SetLoaderStatus(false);
                if (response == "") {
                    $translate("PASSWORD.SUCCESS.RESET").then(function (translate) {
                        Flash.create('success', translate);
                    });
                    $location.path('/login');
                }
                else{
                    $translate("ERRORS.EMAIL-CHECK").then(function (translate) {
                        Flash.create('danger', translate);
                    });
                }
            })
        };





    }

})();