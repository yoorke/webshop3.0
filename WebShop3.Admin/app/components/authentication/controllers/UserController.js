(function () {
    'use strict';

    angular.module('webShopAdmin').controller('UserController', UserController);

    UserController.$inject = ['$controller', 'GlobalService', 'UserService', '$translate', 'parameters', 'Flash', '$uibModalInstance'];

    function UserController($controller, GlobalService, UserService, $translate, parameters, Flash, $uibModalInstance) {
        var vm = this;
        vm.Reload = Reload;
        vm.save = save;
   
        $controller('BaseGetByIDController', { vm: vm });
        $controller('CommonController', { vm: vm, $uibModalInstance: $uibModalInstance });

        vm.modelsParameters = GlobalService.GetModelsParameters();

        init();

        function init() {
            if (parameters.ID > 0)
                vm.BaseGetItemByID(parameters.modelName, parameters.ID).then(function (response) {
                    vm.item = response.data;
                    vm.item.ConfirmPassword = "";
                })
            else {
                vm.item = {};
               
            }
        }

        function Reload() {
            init();
        }

        function save() {
            if (parameters.ID == -1 && vm.item.Password !== vm.item.ConfirmPassword)
            {          
                $translate('ERRORS.PASSWORD-CHECK').then(function (translate) {
                    Flash.create('danger', translate);
                });
                return false;
            }
            if (!vm.form.$invalid) {
                GlobalService.SetLoaderStatus(true);
                (parameters.ID > 0 ? UserService.Update(vm.item) : UserService.Create(vm.item)).then(function (response) {
                    GlobalService.SetLoaderStatus(false);
                    if (response.status == 200) {
                        $translate("SAVE.SUCCESS").then(function (translate) {
                            Flash.create('success', translate);
                        });
                        $uibModalInstance.close(response);
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
})();