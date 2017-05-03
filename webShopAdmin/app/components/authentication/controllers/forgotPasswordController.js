(function () {
    'use strict';

    angular
        .module('webShopAdmin')
        .controller('ForgotPasswordController', ForgotPasswordController);

    //ForgotPasswordController.$inject = ['$location', 'UserService', 'Flash', 'GlobalService', 'BaseService'];
    //function ForgotPasswordController($location, UserService, Flash, GlobalService, BaseService) {

    ForgotPasswordController.$inject = ['$location', 'UserService', 'Flash', '$translate', 'GlobalService'];
    function ForgotPasswordController($location, UserService, Flash, $translate, GlobalService) {
        var vm = this;
        vm.Email = '';
        vm.ForgotPassword = ForgotPassword;
        
        
        function ForgotPassword() {
            GlobalService.SetLoaderStatus(true);
            UserService.ForgotPassword(vm, function(response) {
                GlobalService.SetLoaderStatus(false);
                if (response === "") {
                    $translate("PASSWORD.SUCCESS.FORGOT").then(function (translate) {
                        Flash.create('success', translate);
                    });
                }
                else {
                    $translate("ERRORS.EMAIL-CHECK").then(function (translate) {
                        Flash.create('danger', translate);
                    });
                }
            })
    
        };

       

        

        

    }

})();