(function () {
    'use strict';
    angular.module('webShopAdmin').controller('BaseSaveModalController', BaseSaveModalController);

    BaseSaveModalController.$inject = ['GlobalService', 'BaseService', 'vm', '$uibModalInstance', '$translate', 'Flash'];

    function BaseSaveModalController(GlobalService, BaseService, vm, $uibModalInstance, $translate, Flash) {

        vm.BaseSaveModalItem = BaseSaveModalItem;

        //SaveItem
        function BaseSaveModalItem(modelName) {
            vm.submitted = true;
            if (!vm.form.$invalid) {
                GlobalService.SetLoaderStatus(true);
                vm.item.ID = vm.item.ID != undefined ? vm.item.ID : -1;
                BaseService.Save(modelName, vm.item).then(function (response) {
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
                });
            }
        }
    }
})();