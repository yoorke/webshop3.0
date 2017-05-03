(function () {
    'use strict';

    angular.module('webShopAdmin').controller('UserProfileController', UserProfileController);

    UserProfileController.$inject = ['$controller', 'GlobalService', 'UserService', '$rootScope', 'BaseService', 'Flash', '$translate'];

    function UserProfileController($controller, GlobalService, UserService, $rootScope, BaseService, Flash, $translate) {
        var vm = this;
        $controller('InitController', { vm: vm });
        $controller('BaseGetController', { vm: vm });
        $controller('BaseSaveController', { vm: vm });

        init();

        function init() {
            vm.loading = true;
            vm.BasePreSavePass = BasePreSavePass;
 
            GlobalService.SetLoaderStatus(true);
            BaseService.GetByID('userProfile', GlobalService.GetCurrentUser().userID).then(function (response) {
                if (response.status == 200) {
                    vm.itemPass = {};
                    vm.item = response.data;
                    vm.itemPass.ID = "";
                    vm.itemPass.OldPassword = "";
                    vm.itemPass.NewPassword = "";
                    vm.itemPass.ConfirmPassword = "";
                    GlobalService.SetLoaderStatus(false);
                    vm.loading = false;
                }
                else {
                    Flash.create('danger', response.statusText != '' ? response.statusText : 'Error');
                }
            });
        }

        function BasePreSavePass() {
            //proveriti confirm
            if (vm.itemPass.NewPassword !== vm.itemPass.ConfirmPassword) {
                $translate('ERRORS.PASSWORD-CHECK').then(function (translate) {
                    Flash.create('danger', translate);
                });
                return false;
            }
            if (vm.itemPass.NewPassword === vm.itemPass.ConfirmPassword && vm.itemPass.NewPassword != "" && vm.itemPass.ConfirmPassword!="")
            {
                vm.submitted = true;
                if (!vm.form2.$invalid) {
                    GlobalService.SetLoaderStatus(true);
                    UserService.ChangePassword(vm.itemPass).then(function(response){
                        GlobalService.SetLoaderStatus(false);
                        if (response.status == 200) {
                            $translate("SAVE.SUCCESS").then(function (translate) {
                                Flash.create('success', translate);
                            });
                            GlobalService.SetSavedItemStatus(true);
                        }
                        else if (response.status == 401) {
                            $translate('ERRORS.UNAUTHORIZED').then(function (translate) {
                                Flash.create('danger', translate);
                            });
                        }
                        else {
                            $translate('ERRORS.' + response.data).then(function (translate) {
                                Flash.create('danger', translate);
                            });
                        }
                    })
                }
            }
        }      

    }
})();